import { z } from 'zod';
import {
  isValidCNPJ,
  isValidCPF,
  isValidFullName,
  onlyDigits,
} from '../utils/validators';

export const registerSchema = z
  .object({
    personType: z.enum(['fisica', 'juridica']),
    fullName: z
      .string()
      .min(1, 'Nome completo é obrigatório')
      .refine(isValidFullName, 'Informe nome e sobrenome'),
    email: z
      .string()
      .trim()
      .optional()
      .or(z.literal(''))
      .refine((value) => !value || /\S+@\S+\.\S+/.test(value), 'E-mail inválido'),
    phone: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine((value) => {
        if (!value) return true;
        const digits = onlyDigits(value);
        return digits.length >= 10 && digits.length <= 11;
      }, 'Telefone inválido'),
    cep: z
      .string()
      .min(1, 'CEP é obrigatório')
      .refine((value) => onlyDigits(value).length === 8, 'CEP inválido'),
    address: z.string().min(1, 'Endereço é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    district: z.string().min(1, 'Bairro é obrigatório'),
    state: z
      .string()
      .min(2, 'Estado é obrigatório')
      .max(2, 'Use apenas a sigla do estado'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    corporateName: z.string().optional(),
    tradeName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.personType === 'fisica') {
      if (!data.cpf || !isValidCPF(data.cpf)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cpf'],
          message: 'CPF inválido',
        });
      }
    }

    if (data.personType === 'juridica') {
      if (!data.cnpj || !isValidCNPJ(data.cnpj)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['cnpj'],
          message: 'CNPJ inválido',
        });
      }

      if (!data.corporateName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['corporateName'],
          message: 'Razão social é obrigatória',
        });
      }

      if (!data.tradeName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['tradeName'],
          message: 'Nome fantasia é obrigatório',
        });
      }
    }
  });

export type RegisterSchemaData = z.infer<typeof registerSchema>;
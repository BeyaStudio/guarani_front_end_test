export type PersonType = 'fisica' | 'juridica';

export type RegisterFormData = {
  personType: PersonType;
  fullName: string;
  email?: string;
  phone?: string;
  cep: string;
  address: string;
  number: string;
  complement?: string;
  district: string;
  state: string;
  city: string;
  cpf?: string;
  cnpj?: string;
  corporateName?: string;
  tradeName?: string;
};
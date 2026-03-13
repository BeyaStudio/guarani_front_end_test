import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, type RegisterSchemaData } from './schemas/registerSchema';
import { maskCEP, maskCPF, maskCNPJ, maskPhone } from './utils/masks';
import { fetchAddressByCep } from './services/viacep';


const inputClass =
  'w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-200';

const radioCardClass =
  'flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100';

export default function App() {
  const [addressLocked, setAddressLocked] = useState(false);
  const [cepFound, setCepFound] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterSchemaData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      personType: 'juridica',
      fullName: '',
      email: '',
      phone: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      district: '',
      state: '',
      city: '',
      cpf: '',
      cnpj: '',
      corporateName: '',
      tradeName: '',
    },
    mode: 'onSubmit',
  });

  const personType = watch('personType');
  const cep = watch('cep');

  const formTitle = useMemo(() => {
    return personType === 'juridica'
      ? 'Cadastro de Pessoa Jurídica'
      : 'Cadastro de Pessoa Física';
  }, [personType]);

  useEffect(() => {
    const loadCep = async () => {
      const cleanCep = (cep || '').replace(/\D/g, '').slice(0, 8);
  
      if (cleanCep.length !== 8) {
        setAddressLocked(false);
        setCepFound(false);
        return;
      }
  
      try {
        clearErrors('cep');
  
        const data = await fetchAddressByCep(cleanCep);
  
        setValue('address', data.logradouro || '');
        setValue('district', data.bairro || '');
        setValue('city', data.localidade || '');
        setValue('state', data.uf || '');
  
        if (data.complemento) {
          setValue('complement', data.complemento);
        }
  
        setCepFound(true);
        setAddressLocked(true);
      } catch {
        setCepFound(false);
        setAddressLocked(false);
  
        setError('cep', {
          type: 'manual',
          message: 'CEP inválido ou não encontrado',
        });
      } finally {
      }
    };
  
    loadCep();
  }, [cep, clearErrors, setError, setValue]);

  const onSubmit = (data: RegisterSchemaData) => {
    if (!cepFound) {
      setValue('cep', '', {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
  
      setError('cep', {
        type: 'manual',
        message: 'CEP inválido ou não encontrado',
      });
      return;
    }
  
    console.log('Dados válidos:', data);
    alert('Formulário válido! Confira o console.');
  };

  return (
    <main className="min-h-[100dvh] box-border bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl md:p-10">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
            Teste técnico Front End Guarani
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight !text-black md:text-4xl">
            Formulário de Cadastro
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base">
            Beya Studio
          </p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-semibold">Modo atual:</span> {formTitle}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <span className="mb-3 block text-sm font-semibold text-slate-800">
              Tipo de pessoa
            </span>

            <div className="flex flex-wrap gap-3">
              <label className={radioCardClass}>
                <input type="radio" value="juridica" {...register('personType')} />
                <span className="font-medium">Pessoa jurídica</span>
              </label>

              <label className={radioCardClass}>
                <input type="radio" value="fisica" {...register('personType')} />
                <span className="font-medium">Pessoa física</span>
              </label>
            </div>
          </div>

          <Field label="Nome completo" error={errors.fullName?.message} className="md:col-span-2">
            <input
              type="text"
              placeholder="Digite seu nome completo"
              className={inputClass}
              {...register('fullName')}
            />
          </Field>

          <Field label="E-mail" error={errors.email?.message}>
            <input
              type="email"
              placeholder="voce@email.com"
              className={inputClass}
              {...register('email')}
            />
          </Field>

          <Field label="Telefone" error={errors.phone?.message}>
            <input
              type="text"
              placeholder="(11) 99999-9999"
              className={inputClass}
              {...register('phone', {
                onChange: (e) => {
                  setValue('phone', maskPhone(e.target.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                },
              })}
            />
          </Field>

          {personType === 'fisica' && (
          <Field label="CPF" error={errors.cpf?.message} className="md:col-span-2">
            <input
              type="text"
              placeholder="Digite seu CPF"
              className={inputClass}
              {...register('cpf', {
                onChange: (e) => {
                  setValue('cpf', maskCPF(e.target.value), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                },
              })}
            />
          </Field>
        )}

          {personType === 'juridica' && (
            <>
              <Field label="CNPJ" error={errors.cnpj?.message}>
                <input
                  type="text"
                  placeholder="Digite o CNPJ"
                  className={inputClass}
                  {...register('cnpj', {
                    onChange: (e) => {
                      setValue('cnpj', maskCNPJ(e.target.value), {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      });
                    },
                  })}
                />
              </Field>

              <div className="hidden md:block" />

              <Field label="Razão social" error={errors.corporateName?.message}>
                <input
                  type="text"
                  placeholder="Digite a razão social"
                  className={inputClass}
                  {...register('corporateName')}
                />
              </Field>

              <Field label="Nome fantasia" error={errors.tradeName?.message}>
                <input
                  type="text"
                  placeholder="Digite o nome fantasia"
                  className={inputClass}
                  {...register('tradeName')}
                />
              </Field>
            </>
          )}

          <Field label="CEP" error={errors.cep?.message}>
            <input
              type="text"
              placeholder="00000-000"
              className={inputClass}
              {...register('cep', {
                onChange: (e) => {
                  setValue('cep', maskCEP(e.target.value.trim()), {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                },
              })}
            />
          </Field>

          <Field label="Número" error={errors.number?.message}>
            <input
              type="text"
              placeholder='Ex: 123 ou "SN"'
              className={inputClass}
              {...register('number')}
            />
          </Field>

          <Field label="Complemento" error={errors.complement?.message}>
            <input
              type="text"
              placeholder="Apto, bloco, sala..."
              className={inputClass}
              {...register('complement')}
            />
          </Field>

          <Field label="Endereço" error={errors.address?.message} className="md:col-span-2">
            <input
              type="text"
              placeholder="Rua, avenida, alameda..."
              className={inputClass}
              disabled={addressLocked}
              {...register('address')}
            />
          </Field>

          <Field label="Estado (UF)" error={errors.state?.message}>
            <input
              type="text"
              placeholder="SP"
              maxLength={2}
              className={inputClass}
              disabled={addressLocked}
              {...register('state')}
            />
          </Field>

          <div className="md:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-slate-800"
            >
              Validar e enviar cadastro
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function Field({ label, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
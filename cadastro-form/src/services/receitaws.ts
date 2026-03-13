import { onlyDigits } from '../utils/validators';

type ReceitaWsResponse = {
  status: string;
  nome?: string;
  fantasia?: string;
  message?: string;
};

export async function fetchCompanyByCnpj(cnpj: string): Promise<ReceitaWsResponse> {
  const cleanedCnpj = onlyDigits(cnpj);

  const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cleanedCnpj}`);

  if (!response.ok) {
    throw new Error('Erro ao consultar o CNPJ');
  }

  const data: ReceitaWsResponse = await response.json();

  if (data.status === 'ERROR') {
    throw new Error(data.message || 'CNPJ não encontrado');
  }

  return data;
}
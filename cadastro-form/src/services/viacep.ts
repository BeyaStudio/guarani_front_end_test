type ViaCepResponse = {
    cep?: string;
    logradouro?: string;
    complemento?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    erro?: boolean;
  };
  
  export async function fetchAddressByCep(cep: string): Promise<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
  
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }
  
    const data: ViaCepResponse = await response.json();
  
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
  
    return data;
  }
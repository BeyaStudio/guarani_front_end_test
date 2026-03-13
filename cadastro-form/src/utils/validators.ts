export function onlyDigits(value: string) {
    return value.replace(/\D/g, '');
  }
  
  export function isValidFullName(name: string) {
    const parts = name.trim().split(/\s+/);
    return parts.length >= 2;
  }
  
  export function isValidCPF(cpf: string) {
    const cleaned = onlyDigits(cpf);
  
    if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(cleaned[i]) * (10 - i);
    }
  
    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== Number(cleaned[9])) return false;
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(cleaned[i]) * (11 - i);
    }
  
    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;
  
    return secondDigit === Number(cleaned[10]);
  }
  
  export function isValidCNPJ(cnpj: string) {
    const cleaned = onlyDigits(cnpj);
  
    if (cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) return false;
  
    const calc = (base: string, factors: number[]) => {
      const total = base
        .split('')
        .reduce((acc, num, i) => acc + Number(num) * factors[i], 0);
  
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const base = cleaned.slice(0, 12);
    const digit1 = calc(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digit2 = calc(base + digit1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  
    return cleaned === `${base}${digit1}${digit2}`;
  }
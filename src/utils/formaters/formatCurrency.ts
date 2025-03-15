export type LocaleType = 'pt-BR' | 'en-US' | 'es-ES';
export type CurrencyType = 'BRL' | 'USD' | 'EUR';
export type UnitType =  'currency' | 'kg';

const formatCurrency = (
  value?: number,
  unit: UnitType = 'currency',
  locale: LocaleType = 'pt-BR',
  currency: CurrencyType = 'BRL',
) => {
  if (!value || isNaN(value)) {
    return unit === 'currency' ? 'R$ 0,00' : '0 Kg'; // Retorno padrão para cada unidade
  }

  if (unit === 'currency') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  }

  if (unit === 'kg') {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + ' Kg'; 
  }
};

export { formatCurrency };

export function parseNumberToCurrency(value: number): string {
  return `${Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
  }).format(value)}`
}
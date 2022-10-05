export class ValueHelper {
  static formatToBRLValue(value: number) {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
    }).format(value);

    return Number(formattedValue) / 100;
  }
}

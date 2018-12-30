export default function formatCurrency(num) {
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'usd',
  });
}

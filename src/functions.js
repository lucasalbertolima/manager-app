import { format } from 'date-fns';

export function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

export function convertDataAndHours(date) {
  const dateString = date;
  const dateObj = new Date(dateString);
  const formattedDate = format(dateObj, 'dd/MM/yyyy, HH:mm:ss');
  return formattedDate;
};

export function variation(valueFinish, valueInitial) {
  const variation = ((valueFinish - valueInitial)/valueInitial)*100;
  return variation
};
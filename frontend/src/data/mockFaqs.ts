import { FAQ } from '../types/faq';

export const mockFaqs: FAQ[] = [
  {
    id: 'faq-1',
    question: '¿Quiénes pueden participar en los eventos?',
    answer: 'Todos los estudiantes matriculados en la facultad, así como egresados y público general interesado en la temática del evento, previa inscripción en el formulario correspondiente.'
  },
  {
    id: 'faq-2',
    question: '¿Los eventos tienen algún costo?',
    answer: 'La gran mayoría de nuestros eventos organizados por el centro cultural son completamente gratuitos, a menos que se especifique lo contrario en la descripción detallada del evento.'
  },
  {
    id: 'faq-3',
    question: '¿Se entregan certificados de participación?',
    answer: 'Sí, para la mayoría de eventos académicos, talleres y conferencias magistrales, se emite un certificado digital de asistencia avalado por la facultad a los participantes que registren su asistencia.'
  }
];

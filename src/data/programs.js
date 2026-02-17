import universities from './universities'

// Программы — реалистичные примеры
const programs = [
  {
    id: 'cs-uoft-bsc',
    title: 'Computer Science (BSc)',
    country: 'Канада',
    university: 'University of Toronto',
    universityId: 'uoft',
    degree: 'Бакалавриат',
    requirements: ['IELTS 7.0', 'GPA 3.5', 'мотивационное письмо'],
    cost: '$45,000',
    startDate: 'Сентябрь 2026',
    description: 'Интенсивная программа по компьютерным наукам с акцентом на искусственный интеллект и системы.'
  },
  {
    id: 'mba-oxford',
    title: 'MBA (Postgraduate)',
    country: 'Великобритания',
    university: 'University of Oxford',
    universityId: 'oxford',
    degree: 'Магистратура',
    requirements: ['IELTS 7.5', 'GPA 3.2', 'опыт работы 2 года', 'мотивационное письмо'],
    cost: '£65,000',
    startDate: 'Октябрь 2026',
    description: 'Программа для лидеров с мировыми бизнес-кейсами и сетью выпускников.'
  },
  {
    id: 'eng-melb',
    title: 'Master of Engineering',
    country: 'Австралия',
    university: 'University of Melbourne',
    universityId: 'melb',
    degree: 'Магистратура',
    requirements: ['IELTS 6.5', 'GPA 3.0', 'резюме'],
    cost: 'AUD 40,000',
    startDate: 'Февраль 2026',
    description: 'Практико-ориентированное обучение с индустриальными проектами.'
  },
  {
    id: 'mech-tum',
    title: 'Mechanical Engineering (MSc)',
    country: 'Германия',
    university: 'Technical University of Munich',
    universityId: 'tum',
    degree: 'Магистратура',
    requirements: ['TOEFL 90', 'GPA 3.2', 'рекомендации'],
    cost: '€15,000',
    startDate: 'Сентябрь 2026',
    description: 'Сильная техническая подготовка и исследовательские лаборатории.'
  },
  {
    id: 'econ-nus',
    title: 'Economics (BSc)',
    country: 'Сингапур',
    university: 'National University of Singapore',
    universityId: 'nus',
    degree: 'Бакалавриат',
    requirements: ['IELTS 6.5', 'GPA 3.4'],
    cost: 'SGD 30,000',
    startDate: 'Август 2026',
    description: 'Аналитическая программа с сильной эмпирической составляющей.'
  },
  {
    id: 'philosophy-uva',
    title: 'Philosophy (MA)',
    country: 'Нидерланды',
    university: 'University of Amsterdam',
    universityId: 'uva',
    degree: 'Магистратура',
    requirements: ['IELTS 6.5', 'портфолио/эссе'],
    cost: '€12,000',
    startDate: 'Сентябрь 2026',
    description: 'Глубокие академические курсы и международная исследовательская сеть.'
  },
  {
    id: 'data-science-uoft',
    title: 'Data Science (MSc)',
    country: 'Канада',
    university: 'University of Toronto',
    universityId: 'uoft',
    degree: 'Магистратура',
    requirements: ['IELTS 7.0', 'GPA 3.3', 'стек проектов'],
    cost: '$50,000',
    startDate: 'Январь 2027',
    description: 'Статистика, машинное обучение и большие данные в практических проектах.'
  }
]

export default programs

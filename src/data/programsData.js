// programsData.js — единая структура программ (университетские и молодежные события)
const programsData = [
  {
    id: 1,
    title: 'European Youth Summit 2026',
    slug: 'european-youth-summit-2026',
    image: 'https://picsum.photos/seed/euy/1200/640',
    logo: 'https://picsum.photos/seed/euylogo/200/200',
    moments: [
      'https://picsum.photos/seed/euy1/400/260',
      'https://picsum.photos/seed/euy2/400/260',
      'https://picsum.photos/seed/euy3/400/260'
    ],
    location: 'Женева, Швейцария',
    type: 'Международный молодежный / лидерский саммит',
    description: 'Международный саммит молодых лидеров: дискуссии, воркшопы и нетворкинг. Участники получают сертификат и практические навыки лидерства.',
    covered: [
      'Авиабилеты (туда/обратно)',
      'Проживание',
      'Питание',
      'Сбор за шенгенскую визу (если требуется)',
      'Трансферы от/до аэропорта',
      'Местный транспорт',
      'Пригласительное письмо',
      'Доступ ко всем сессиям форума'
    ],
    whoCanApply: 'Возраст 18-50 лет, граждане стран СНГ, любой бэкграунд, разговорный английский.',
    deadline: '10 марта 2026',
    status: 'АКТУАЛЕН на 07.02.2026',
    officialLink: 'https://thecda.co/european-youth-summit-2026/',
    socialMedia: { instagram: 'https://instagram.com/euy_summit', telegram: 'https://t.me/euy_summit', website: 'https://thecda.co' },
    fullyFunded: true
  },
  {
    id: 2,
    title: 'Summer Korean Culture Camp 2026',
    slug: 'summer-korean-culture-camp-2026',
    image: 'https://picsum.photos/seed/kcamp/1200/640',
    logo: 'https://picsum.photos/seed/kcamplogo/200/200',
    moments: [
      'https://picsum.photos/seed/k1/400/260',
      'https://picsum.photos/seed/k2/400/260'
    ],
    location: 'Республика Корея',
    type: 'Культурный обмен / молодежная программа',
    description: 'Погружение в корейскую культуру: языковые занятия, культурные экскурсии и мастер-классы. Доступны частичные и полные гранты для иностранных участников.',
    covered: [
      'Проживание',
      'Культурные программы',
      'Частичный грант на перелет (для некоторых участников)'
    ],
    whoCanApply: 'Студенты 16-25 лет, интересующиеся корейской культурой и обменом.',
    deadline: '20 апреля 2026',
    status: 'АКТУАЛЕН на 07.02.2026',
    officialLink: 'https://example.org/korean-culture-camp-2026',
    socialMedia: { instagram: 'https://instagram.com/koreancamp', telegram: 'https://t.me/koreancamp', website: 'https://example.org' },
    fullyFunded: false
  },
  // Университетские программы (пример)
  {
    id: 3,
    title: 'Computer Science (BSc) — Торонто',
    slug: 'computer-science-bsc-toronto',
    image: 'https://picsum.photos/seed/uoft/1200/640',
    logo: 'https://picsum.photos/seed/uoftlogo/200/200',
    moments: [ 'https://picsum.photos/seed/uoft1/400/260' ],
    location: 'Торонто, Канада',
    type: 'Бакалавриат',
    description: 'Интенсивная программа по компьютерным наукам с акцентом на искусственный интеллект и большие данные. Академические проекты и стажировки в индустрии.',
    covered: [],
    whoCanApply: 'Выпускники средней школы с сильными результатами по математике и физике; требуется IELTS/TOEFL.',
    deadline: 'Приём на осень 2026',
    status: 'Приём открыт',
    officialLink: 'https://www.utoronto.ca',
    socialMedia: { instagram: 'https://instagram.com/uoft', telegram: null },
    fullyFunded: false
  },
  {
    id: 4,
    title: 'MBA — Оксфорд',
    slug: 'mba-oxford-2026',
    image: 'https://picsum.photos/seed/oxford/1200/640',
    logo: 'https://picsum.photos/seed/oxfordlogo/200/200',
    moments: [ 'https://picsum.photos/seed/ox1/400/260' ],
    location: 'Оксфорд, Великобритания',
    type: 'Магистратура (MBA)',
    description: 'Программа MBA для опытных профессионалов с фокусом на международный менеджмент и предпринимательство.',
    covered: [],
    whoCanApply: 'Профессионалы с опытом работы 2+ года, требования: рекомендации, мотивационное письмо, IELTS/TOEFL.',
    deadline: 'Октябрь 2026',
    status: 'Приём на 2026 закрыт',
    officialLink: 'https://www.ox.ac.uk',
    socialMedia: { instagram: 'https://instagram.com/oxford_uni', telegram: null },
    fullyFunded: false
  }
]

export default programsData

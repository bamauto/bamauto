export default {
  editor: {
    label: {
      en: 'Jump Plan Recommender',
      ko: '최적 운영 플랜 추천'
    },
    icon: 'auto_awesome'
  },
  properties: {
    initialJumpCount: {
      label: {
        en: 'Initial Jump Count',
        ko: '초기 점프 수'
      },
      type: 'Number',
      section: 'settings',
      bindable: true,
      defaultValue: 500,
    },
    initialOption: {
      label: {
        en: 'Default Option',
        ko: '기본 옵션'
      },
      type: 'TextSelect',
      section: 'settings',
      bindable: true,
      defaultValue: 'steady',
      options: {
        options: [
          { value: 'fast', label: { en: 'Fast Consumption', ko: '빠른 소진' } },
          { value: 'steady', label: { en: 'Steady Operation', ko: '꾸준한 운영' } },
          { value: 'peak', label: { en: 'Peak Time Focus', ko: '피크타임 집중' } }
        ]
      },
    },
    primaryColor: {
      label: {
        en: 'Primary Color',
        ko: '주요 색상'
      },
      type: 'Color',
      section: 'style',
      bindable: true,
      defaultValue: '#6750A4',
    }
  },
  triggerEvents: [
    {
      name: 'open',
      label: { 
        en: 'On Open',
        ko: '열릴 때'
      },
      event: {}
    },
    {
      name: 'close',
      label: { 
        en: 'On Close',
        ko: '닫힐 때'
      },
      event: {}
    },
    {
      name: 'confirm',
      label: { 
        en: 'On Confirm',
        ko: '확인 시'
      },
      event: {
        jumpCount: 500,
        option: 'steady',
        interval: 21,
        duration: { days: 7, hours: 7, minutes: 0 }
      }
    },
    {
      name: 'reset',
      label: { 
        en: 'On Reset',
        ko: '초기화 시'
      },
      event: {}
    }
  ],
  actions: [
    {
      label: {
        en: 'Open Modal',
        ko: '모달 열기'
      },
      action: 'openModal'
    },
    {
      label: {
        en: 'Close Modal',
        ko: '모달 닫기'
      },
      action: 'closeModal'
    },
    {
      label: {
        en: 'Reset Form',
        ko: '폼 초기화'
      },
      action: 'resetForm'
    }
  ]
};
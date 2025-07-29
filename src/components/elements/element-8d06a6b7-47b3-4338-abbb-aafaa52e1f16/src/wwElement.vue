<template>
  <div class="jump-plan-recommender" :class="{ 'is-open': isOpen }">
    <div class="modal-backdrop" v-if="isOpen" @click="closeModal"></div>
    <div class="modal-container" v-if="isOpen">
      <div class="modal-content">
        <!-- Header Section -->
        <div class="modal-header">
          <div class="header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.2 4L12.9 7.5H15.5L13.7 4H11.2ZM4.3 14L8 12.5V10L4.3 11.5V14ZM15.5 12.5L19.2 14V11.5L15.5 10V12.5ZM12 8L9.6 11.5L12 15L14.4 11.5L12 8ZM6 19.5L9 18.2V15.6L6 16.9V19.5ZM15 18.2L18 19.5V16.9L15 15.6V18.2Z" fill="#6750A4"/>
            </svg>
          </div>
          <h2 class="header-title">최적 운영 플랜 추천</h2>
        </div>

        <!-- Input Section -->
        <div class="input-section">
          <div class="text-input-container">
            <label for="jumpCount">현재 보유 점프</label>
            <input 
              type="number" 
              id="jumpCount" 
              class="text-input" 
              v-model="jumpCount"
              @input="calculateRecommendation"
            />
          </div>

          <div class="radio-options">
            <div class="radio-option" :class="{ 'selected': selectedOption === 'fast' }">
              <input 
                type="radio" 
                id="fast" 
                name="planOption" 
                value="fast"
                v-model="selectedOption"
                @change="calculateRecommendation"
              />
              <label for="fast">
                <div class="radio-button">
                  <div class="radio-outer">
                    <div class="radio-inner" v-if="selectedOption === 'fast'"></div>
                  </div>
                </div>
                <div class="radio-content">
                  <div class="radio-title">빠른 소진</div>
                  <div class="radio-description">가장 짧은 기간에 즉각적인 효과를 봅니다. (7일 기준)</div>
                </div>
              </label>
            </div>

            <div class="radio-option" :class="{ 'selected': selectedOption === 'steady' }">
              <input 
                type="radio" 
                id="steady" 
                name="planOption" 
                value="steady"
                v-model="selectedOption"
                @change="calculateRecommendation"
              />
              <label for="steady">
                <div class="radio-button">
                  <div class="radio-outer">
                    <div class="radio-inner" v-if="selectedOption === 'steady'"></div>
                  </div>
                </div>
                <div class="radio-content">
                  <div class="radio-title">꾸준한 운영</div>
                  <div class="radio-description">표준 기간 동안 안정적으로 노출을 유지합니다. (30일 기준)</div>
                </div>
              </label>
            </div>

            <div class="radio-option" :class="{ 'selected': selectedOption === 'peak' }">
              <input 
                type="radio" 
                id="peak" 
                name="planOption" 
                value="peak"
                v-model="selectedOption"
                @change="calculateRecommendation"
              />
              <label for="peak">
                <div class="radio-button">
                  <div class="radio-outer">
                    <div class="radio-inner" v-if="selectedOption === 'peak'"></div>
                  </div>
                </div>
                <div class="radio-content">
                  <div class="radio-title">피크타임 집중</div>
                  <div class="radio-description">효율적인 피크타임(저녁 4시간)에 집중합니다. (14일 기준)</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Result Card Section -->
        <div class="result-card">
          <div class="result-header">
            <div class="result-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.03 8.2L11.36 13.86C11.22 14.14 10.98 14.36 10.7 14.48C10.42 14.6 10.12 14.62 9.83 14.54C9.54 14.46 9.29 14.28 9.11 14.04C8.93 13.8 8.85 13.5 8.87 13.2L9.05 10.11L7.09 9.94C6.86 9.91 6.64 9.82 6.46 9.67C6.27 9.53 6.13 9.33 6.04 9.11C5.96 8.88 5.94 8.64 5.99 8.4C6.04 8.17 6.15 7.95 6.31 7.78L10.66 3.25C10.81 3.09 11 2.97 11.21 2.92C11.42 2.86 11.64 2.87 11.84 2.93C12.05 3 12.23 3.13 12.37 3.3C12.5 3.47 12.59 3.68 12.61 3.9L13.05 7.44L14.93 7.92C15.16 7.97 15.37 8.09 15.54 8.26C15.7 8.43 15.81 8.65 15.85 8.88C15.89 9.12 15.86 9.36 15.77 9.58C15.67 9.8 15.52 9.98 15.32 10.11L14.03 8.2Z" fill="#6750A4"/>
              </svg>
            </div>
            <div class="result-title">추천 솔루션</div>
          </div>
          <div class="result-content">
            <div class="result-interval">
              점프 주기: <span class="interval-value">{{ jumpInterval }}분</span>의 주기를 추천합니다.
            </div>
            <div class="result-description">
              이 주기로 설정하면 약 <span class="duration-value">{{ duration.days }}일 {{ duration.hours }}시간 {{ duration.minutes }}분</span> 동안 운영할 수 있어요!
            </div>
          </div>
        </div>

        <!-- Action Buttons Section -->
        <div class="action-buttons">
          <button class="reset-button" @click="resetForm">초기화</button>
          <button class="confirm-button" @click="confirmPlan">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  props: {
    content: {
      type: Object,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
  },
  emits: ['trigger-event'],
  setup(props, { emit }) {
    // Editor state
    const isEditing = computed(() => {
      // eslint-disable-next-line no-unreachable
      return false;
    });

    // Modal state
    const isOpen = ref(false);
    
    // Form values
    const jumpCount = ref(500);
    const selectedOption = ref('steady');
    
    // Calculation results
    const jumpInterval = ref(21);
    const duration = ref({
      days: 7,
      hours: 7,
      minutes: 0
    });

    // Internal variables for external access
    const { value: resultInterval, setValue: setResultInterval } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'resultInterval',
      type: 'number',
      defaultValue: 21
    });

    const { value: resultDuration, setValue: setResultDuration } = wwLib.wwVariable.useComponentVariable({
      uid: props.uid,
      name: 'resultDuration',
      type: 'object',
      defaultValue: { days: 7, hours: 7, minutes: 0 }
    });

    // Methods
    const openModal = () => {
      if (isEditing.value) return;
      isOpen.value = true;
      emit('trigger-event', { name: 'open', event: {} });
    };

    const closeModal = () => {
      if (isEditing.value) return;
      isOpen.value = false;
      emit('trigger-event', { name: 'close', event: {} });
    };

    const calculateRecommendation = () => {
      const count = parseInt(jumpCount.value) || 0;
      
      // Different calculation logic based on selected option
      let intervalMinutes = 21; // Default value
      let totalMinutes = 0;
      
      if (selectedOption.value === 'fast') {
        // 7 days target
        const minutesPerDay = 24 * 60;
        const targetDays = 7;
        totalMinutes = targetDays * minutesPerDay;
        intervalMinutes = Math.max(1, Math.floor(totalMinutes / count));
      } else if (selectedOption.value === 'steady') {
        // 30 days target
        const minutesPerDay = 24 * 60;
        const targetDays = 30;
        totalMinutes = targetDays * minutesPerDay;
        intervalMinutes = Math.max(1, Math.floor(totalMinutes / count));
      } else if (selectedOption.value === 'peak') {
        // 14 days target, but only 4 hours per day
        const minutesPerDay = 4 * 60;
        const targetDays = 14;
        totalMinutes = targetDays * minutesPerDay;
        intervalMinutes = Math.max(1, Math.floor(totalMinutes / count));
      }
      
      // Calculate total duration with the calculated interval
      const totalDurationMinutes = intervalMinutes * count;
      const days = Math.floor(totalDurationMinutes / (24 * 60));
      const remainingMinutes = totalDurationMinutes % (24 * 60);
      const hours = Math.floor(remainingMinutes / 60);
      const minutes = remainingMinutes % 60;
      
      // Update the results
      jumpInterval.value = intervalMinutes;
      duration.value = {
        days,
        hours,
        minutes
      };
      
      // Update internal variables
      setResultInterval(intervalMinutes);
      setResultDuration({ days, hours, minutes });
    };

    const resetForm = () => {
      if (isEditing.value) return;
      jumpCount.value = 500;
      selectedOption.value = 'steady';
      calculateRecommendation();
      emit('trigger-event', { name: 'reset', event: {} });
    };

    const confirmPlan = () => {
      if (isEditing.value) return;
      closeModal();
      emit('trigger-event', { 
        name: 'confirm', 
        event: { 
          jumpCount: jumpCount.value,
          option: selectedOption.value,
          interval: jumpInterval.value,
          duration: duration.value
        } 
      });
    };

    // Initialize calculation
    calculateRecommendation();

    // Watch for content changes
    watch(() => props.content.initialJumpCount, (newVal) => {
      if (newVal !== undefined && newVal !== null) {
        jumpCount.value = parseInt(newVal) || 500;
        calculateRecommendation();
      }
    }, { immediate: true });

    watch(() => props.content.initialOption, (newVal) => {
      if (newVal && ['fast', 'steady', 'peak'].includes(newVal)) {
        selectedOption.value = newVal;
        calculateRecommendation();
      }
    }, { immediate: true });

    return {
      isOpen,
      jumpCount,
      selectedOption,
      jumpInterval,
      duration,
      openModal,
      closeModal,
      calculateRecommendation,
      resetForm,
      confirmPlan,
      resultInterval,
      resultDuration
    };
  }
};
</script>

<style lang="scss" scoped>
.jump-plan-recommender {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  color: #1C1B1F;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.modal-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content {
  background-color: #FFFFFF;
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.header-icon {
  margin-right: 12px;
  color: #6750A4;
}

.header-title {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  color: #1C1B1F;
}

.input-section {
  margin-bottom: 24px;
}

.text-input-container {
  margin-bottom: 16px;
  
  label {
    display: block;
    font-size: 12px;
    color: #49454F;
    margin-bottom: 4px;
  }
}

.text-input {
  width: 100%;
  height: 56px;
  border: 1px solid #79747E;
  border-radius: 4px;
  padding: 16px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  
  &:focus {
    border-color: #6750A4;
    border-width: 2px;
  }
}

.radio-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-option {
  position: relative;
  
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  label {
    display: flex;
    align-items: flex-start;
    cursor: pointer;
    padding: 8px 0;
  }
  
  .radio-button {
    margin-right: 12px;
    margin-top: 2px;
  }
  
  .radio-outer {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #79747E;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .radio-inner {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #6750A4;
  }
  
  .radio-content {
    flex: 1;
  }
  
  .radio-title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 2px;
  }
  
  .radio-description {
    font-size: 14px;
    color: #49454F;
  }
  
  &.selected {
    .radio-outer {
      border-color: #6750A4;
    }
    
    .radio-title {
      color: #6750A4;
    }
  }
}

.result-card {
  background-color: #ECE6F0;
  border: 1px solid #6750A4;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
}

.result-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.result-icon {
  margin-right: 8px;
  color: #6750A4;
}

.result-title {
  font-size: 16px;
  font-weight: 500;
  color: #1C1B1F;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-interval {
  font-size: 16px;
  
  .interval-value {
    font-size: 20px;
    font-weight: 700;
    color: #6750A4;
  }
}

.result-description {
  font-size: 14px;
  color: #49454F;
  
  .duration-value {
    font-weight: 700;
    color: #1C1B1F;
  }
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #E4E4E4;
}

.reset-button {
  background-color: transparent;
  color: #6750A4;
  border: 1px solid #6750A4;
  border-radius: 100px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(103, 80, 164, 0.08);
  }
}

.confirm-button {
  background-color: #6750A4;
  color: white;
  border: none;
  border-radius: 100px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #5D4794;
  }
}
</style>
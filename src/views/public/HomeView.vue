<template>
  <MainWrapper>
    <section class="home">
      <div class="home__hero">
        <div class="home__hero-text">
          <h1 class="home__title">
            Создай свою<br />
            вселенную мыслей
          </h1>
          <div class="home__actions">
            <MainButton
              title="Начать путешествие"
              size="large"
              @click="onPrimaryClick"
            />
          </div>
        </div>

        <div class="home__hero-preview">
          <div class="home__orbit home__orbit--outer"></div>
          <div class="home__orbit home__orbit--inner"></div>
          <div class="home__star"></div>
          <div class="home__planet home__planet--one"></div>
          <div class="home__planet home__planet--two"></div>
          <div class="home__planet home__planet--three"></div>
        </div>
      </div>

      <section id="how" class="home__section home__section--how">
        <h2 class="home__section-title">Как устроена твоя вселенная</h2>

        <div class="home__steps">
          <div class="home__step-card">
            <h3 class="home__step-title">1. Галактики</h3>
            <p class="home__step-text">
              Глобальные разделы: «Работа», «Учёба», «Фильмы», «Идеи».
              Каждая галактика — отдельная тема твоей жизни.
            </p>
          </div>
          <div class="home__step-card">
            <h3 class="home__step-title">2. Планеты</h3>
            <p class="home__step-text">
              Внутри галактик рождаются планеты — отдельные заметки.
              У каждой свой цвет и своя орбита.
            </p>
          </div>
          <div class="home__step-card">
            <h3 class="home__step-title">3. Заметки-конспекты</h3>
            <p class="home__step-text">
              На планете — полноценный редактор: выделения, списки,
              заголовки. Всё, как в обычном блокноте, только в космосе.
            </p>
          </div>
        </div>
      </section>

      <section class="home__section home__section--features">
        <h2 class="home__section-title">Почему это удобно</h2>
        <div class="home__features-grid">
          <div class="home__feature-card">
            <h3 class="home__feature-title">Визуальное мышление</h3>
            <p class="home__feature-text">
              Видишь не просто список заметок, а карту своей Вселенной:
              галактики, орбиты, планеты.
            </p>
          </div>
          <div class="home__feature-card">
            <h3 class="home__feature-title">Чистый фокус</h3>
            <p class="home__feature-text">
              Минималистичный интерфейс и тёмный фон помогают сосредоточиться
              на тексте и идеях.
            </p>
          </div>
          <div class="home__feature-card">
            <h3 class="home__feature-title">Гибкая структура</h3>
            <p class="home__feature-text">
              Переноси смысловые блоки в отдельные галактики, разбивай
              большие темы на планеты-подразделы.
            </p>
          </div>
        </div>
      </section>

      <section class="home__section home__section--cta">
        <h2 class="home__section-title">
          Готовы создать первую галактику?
        </h2>
        <p class="home__section-subtitle">
          Займёт пару минут: придумай название, выбери цвет —
          и твоя Вселенная начнёт расширяться.
        </p>
        <MainButton
          title="Создать галактику"
          size="large"
          @click="onPrimaryClick"
        />
      </section>
    </section>
  </MainWrapper>
</template>

<script setup lang="ts">
import MainWrapper from "@/components/template/MainWrapper.vue";
import MainButton from "@/components/ui/button/MainButton.vue";

const emit = defineEmits<{
  (e: "show-auth"): void;
}>();

const onPrimaryClick = () => {
  emit("show-auth");
};
</script>

<style scoped lang="scss">
.home {
  color: #ffffff;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0 3rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  @media (max-width: 600px) {
    gap: 3rem;
  }

  &__hero {
    display: grid;
    grid-template-columns: minmax(0, 3fr) minmax(0, 2.5fr);
    align-items: center;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  &__hero-text {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__title {
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    line-height: 1.1;
    font-weight: 700;
  }

  &__subtitle {
    max-width: 34rem;
    font-size: 1rem;
    line-height: 1.5;
    opacity: 0.85;
  }

  &__actions {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    
    & button{
      width: fit-content;
      @media (max-width: 600px) {
        width: 100%;
      }
    }
  }

  &__link {
    background: transparent;
    border: none;
    color: #ffffffb3;
    font-size: 0.95rem;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 0;

    &:hover {
      color: #ffffff;
    }
  }

  &__hero-preview {
    position: relative;
    height: 290px;
    border-radius: 999px;
    width: 290px;
    margin: 0 auto;
  }

  &__orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    border: 1px dashed rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%) scaleY(0.7);

    &--outer {
      width: 280px;
      height: 280px;
    }

    &--inner {
      width: 160px;
      height: 160px;
    }
  }

  &__star {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, #ffffff, #f5c76a 60%, #d88a30 100%);
    box-shadow:
      0 0 12px rgba(255, 255, 255, 0.9),
      0 0 30px rgba(255, 215, 160, 0.7);
  }

  &__planet {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;

    &--one {
      top: 50px;
      right: 67px;
      background: #8bd5ff;
      box-shadow: 0 0 10px rgba(139, 213, 255, 0.9);
    }

    &--two {
      bottom: 55px;
      left: 60px;
      background: #ff7ad9;
      box-shadow: 0 0 10px rgba(255, 122, 217, 0.9);
    }

    &--three {
      bottom: 105px;
      right: 71px;
      background: #7dff9c;
      box-shadow: 0 0 10px rgba(125, 255, 156, 0.9);
    }
  }

  &__preview-caption {
    position: absolute;
    bottom: 1rem;
    left: 1.5rem;
    right: 1.5rem;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__section-title {
    font-size: 1.6rem;
  }

  &__section-subtitle {
    max-width: 32rem;
    font-size: 0.95rem;
    opacity: 0.8;
  }

  &__steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  &__step-card {
    border-radius: 20px;
    padding: 1.25rem 1.25rem 1.5rem;
    background: rgba(8, 12, 20, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(14px);
  }

  &__step-title {
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }

  &__step-text {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  &__features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  &__feature-card {
    border-radius: 20px;
    padding: 1.25rem 1.25rem 1.5rem;
    background: rgba(8, 12, 20, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(18px);
  }

  &__feature-title {
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
  }

  &__feature-text {
    font-size: 0.9rem;
    opacity: 0.85;
    line-height: 1.5;
  }

  &__section--cta {
    align-items: flex-start;
    text-align: left;

    @media (max-width: 600px) {
      align-items: stretch;
    }

    .home__section-title {
      margin-bottom: 0.25rem;
    }
    
    & button{
      width: fit-content;

      @media (max-width: 600px) {
        width: 100%;
      }
    }
  }
}
</style>

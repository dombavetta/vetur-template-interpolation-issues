<template>
  <section class="scheduling-getting-started-page">
    <form id="form" class="container">
      <div class="form-item">
        <strong>Who is this for?</strong>
        <sd-select
          v-model="patientId"
          style="width: 100%"
          @input="formDirtyFlags.user = true"
        >
          <sd-select-item
            :label="`${profile.firstName} ${profile.lastName}`"
            :value="profile.id"
          />
          <template v-if="profile.dependents">
            <sd-select-item
              v-for="dep in profile.dependents || []"
              :key="dep.id"
              :label="`${dep.firstName} ${dep.lastName}`"
              :value="dep.id"
            />
          </template>
        </sd-select>
        <span
          v-show="
            formDirtyFlags.reason &&
              (userHasNonSchedualableProvider ||
                someLongVariableNameThatIsGoingToGetNewLined)
          "
          class="error"
        >
          <template v-if="userHasNonSchedualableProvider"
            >The provider in this user's profile is not available to schedule
            with.</template
          >
          <template v-else
            >No provider was found in this users profile.</template
          >
        </span>
      </div>
      <div class="form-item">
        <strong
          >Provide some an additional information about your reason for
          visit.</strong
        >
        <input @input="formDirtyFlags.reason = true" />
        <span v-show="formDirtyFlags.reason" class="error"
          >Please provide a reason for visit.</span
        >
      </div>
      <button type="submit">Pick a time</button>
    </form>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

interface BaseProfile {
  id: string
  firstName: string
  lastName: string
  readonly displayName: string
  primaryCareProviderNpi: number
}

interface Profile extends BaseProfile {
  dependents: BaseProfile[]
}

@Component
export default class SchedulingGettingStartedPage extends Vue {
  public patientId = ''
  public userHasNonSchedualableProvider = false
  public someLongVariableNameThatIsGoingToGetNewLined = false
  public appointmentTypes = [
    {
      id: 1,
      name: 'Routine',
      description: 'Routine Care......'
    },
    {
      id: 2,
      name: 'Ongoing Condition',
      descriptions: 'description.....!!!'
    }
  ]

  public formDirtyFlags = {
    user: false,
    type: false,
    reason: false
  }

  public get profile(): Profile {
    return {
      id: 'some_id_0',
      firstName: 'first',
      lastName: 'last',
      displayName: 'first last',
      primaryCareProviderNpi: 12345,
      dependents: [
        {
          id: 'some_id_1',
          firstName: 'depfirst',
          lastName: 'deplast',
          displayName: 'depfirst deplast',
          primaryCareProviderNpi: 67890
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$style--padding-content: 15px;
$border--radius: 10px;
$color--white: #ffffff;
$color--red-primary: #ee3224;
$color--grey-light-1: #e7e7e8;
$color--grey-light-2: #d8d8d8;
$color--grey-light-3: #9fa7b3;
$color--grey-dark-1: #485563;
$color--grey-dark-2: #4a5562;

.scheduling-getting-started-page {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: $style--padding-content;

  .container {
    width: 600px;
    max-width: 600px;
    padding: $style--padding-content;
    border-radius: $border--radius;
    border: 1px solid $color--grey-light-1;
    background-color: $color--white;
    box-shadow: 0 0 10px 4px rgba(74, 85, 98, 0.07);
  }

  #form {
    position: relative;
    z-index: 1;
    transform: scale(1);
    filter: blur(0);
    pointer-events: unset;
    color: $color--grey-dark-2;

    .form-item {
      + .form-item {
        margin-top: $style--padding-content;
      }

      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
      }

      strong {
        // margin-left: $style--padding-content;
        color: $color--grey-dark-2;

        & + * {
          margin-top: 5px;
        }
      }

      .error {
        color: $color--red-primary;
      }
    }

    button[type='submit'] {
      cursor: pointer;
      transition: 0.15s ease;
      margin-top: 20px;
      color: $color--red-primary;
      border: 3px solid $color--red-primary;
      padding: 10px 30px;
      border-radius: 10px;
      font-weight: 500;
      font-size: 1.1rem;

      &:hover {
        color: white;
        background-color: $color--red-primary;
        opacity: 1;
      }
    }
  }

  .appointment-type-item {
    display: flex;
    flex-direction: column;

    :first-child {
      margin-bottom: 5px;
      padding-bottom: 5px;
      font-weight: 700;
      // border-bottom: 1px solid $color--grey-dark-2;
    }

    :nth-child(2) {
      border-radius: 5px;
      background-color: $color--grey-light-2;
      padding: 10px;
      font-size: 0.9rem;
    }
  }

  .link-btn {
    color: $color--red-primary;
    font-size: 1rem;
    padding: 5px 20px;
    border-radius: 10px;
    border: 2px solid $color--red-primary;
    background-color: $color--white;

    &:hover {
      background-color: $color--red-primary;
      color: $color--white;
      opacity: 1;
    }
  }
}
</style>

<template>
  <div>
    <b-modal id="modal-artist" hide-footer>
      <template v-slot:modal-title>Add Artist</template>

      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="name-group" label="Name" label-for="name">
          <b-form-input
            id="name"
            name="name"
            v-model="$v.form.name.$model"
            :state="validateState('name')"
            aria-describedby="name-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="name-live-feedback"
            >Name is required.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group
          id="yearStarted-group"
          label="Year Started"
          label-for="yearStarted"
        >
          <b-form-input
            type="number"
            id="yearStarted"
            name="yearStarted"
            v-model="$v.form.yearStarted.$model"
            :state="validateState('yearStarted')"
            aria-describedby="yearStarted-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="yearStarted-live-feedback"
            >Year started must be greater than or equal to {{ min_year }} and
            less than or equal to {{ max_year }}.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-button @click="resetForm()">Cancel</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { required, minValue, maxValue } from "vuelidate/lib/validators";

const min_year = parseInt("1970");
const max_year = parseInt(new Date().getFullYear().toString());

export default {
  name: "artist-modal",
  data() {
    return {
      id: null,
      form: {
        name: null,
        yearStarted: 1970
      },
      min_year: min_year,
      max_year: max_year
    };
  },
  validations: {
    form: {
      name: { required },
      yearStarted: {
        required,
        minValue: minValue(min_year),
        maxValue: maxValue(max_year)
      }
    }
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        id: null,
        name: null,
        yearStarted: 1970
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });

      setTimeout(() => {
        this.$v.$reset();
      }, 0);

      this.hide();
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.resetForm();
      alert("Form Submitted!");
    },

    show() {
      this.$bvModal.show("modal-artist");
    },
    hide() {
      this.$bvModal.hide("modal-artist");
    }
  }
};
</script>

<style scoped>
.btn {
  margin: 0.5rem;
  float: right;
}
</style>

<template>
  <div>
    <b-modal id="modal-song" hide-footer>
      <template v-slot:modal-title>Add Song</template>

      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="title-group" label="Title" label-for="title">
          <b-form-input
            id="title"
            name="title"
            v-model="$v.form.title.$model"
            :state="validateState('title')"
            aria-describedby="title-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="title-live-feedback"
            >Title is required.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group id="album-group" label="Album" label-for="album">
          <b-form-input
            id="album"
            name="album"
            v-model="$v.form.album.$model"
            :state="validateState('album')"
            aria-describedby="album-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="album-live-feedback"
            >Album is required.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group id="genre-group" label="Genre" label-for="genre">
          <b-form-input
            id="genre"
            name="genre"
            v-model="$v.form.genre.$model"
            :state="validateState('genre')"
            aria-describedby="genre-live-feedback"
          ></b-form-input>
          <b-form-invalid-feedback id="genre-live-feedback"
            >Genre is required.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-form-group id="artist-group" label="Artist" label-for="artist">
          <b-form-select
            id="artist"
            name="artist"
            v-model="$v.form.artist.$model"
            :options="artists"
            value-field="id"
            text-field="name"
            :state="validateState('artist')"
            aria-describedby="artist-live-feedback"
          >
            <template v-slot:first>
              <b-form-select-option :value="null" disabled
                >Select Artist ...</b-form-select-option
              >
            </template>
          </b-form-select>

          <b-form-invalid-feedback id="artist-live-feedback"
            >Artist is required.</b-form-invalid-feedback
          >
        </b-form-group>

        <b-button @click="resetForm()">Cancel</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "song-modal",
  data() {
    return {
      id: "",
      form: {
        title: null,
        album: null,
        genre: null,
        artist: null
      },
      artists: [
        { id: "1", name: "Adam Monroe" },
        { id: "2", name: "Kevin Almond Roe" },
        { id: "3", name: "LBYP" },
        { id: "4", name: "Long Bond Yellow Papers" }
      ]
    };
  },
  validations: {
    form: {
      title: { required },
      album: { required },
      genre: { required },
      artist: { required }
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
        title: null,
        album: null,
        genre: null,
        artist: null
      };

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
      this.$bvModal.show("modal-song");
    },
    hide() {
      this.$bvModal.hide("modal-song");
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

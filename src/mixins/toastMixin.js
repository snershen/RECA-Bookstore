import Swal from 'sweetalert2'

export default {
  methods: {
    showToast(options) {
      return Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        ...options
      }).fire()
    }
  }
}

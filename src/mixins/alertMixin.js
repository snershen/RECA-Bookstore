import Swal from 'sweetalert2'

export default {
  methods: {
    showAlert(options) {
      return Swal.fire({
        // icon: 'warning',
        // showCancelButton: true,
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        ...options
      })
    }
  }
}

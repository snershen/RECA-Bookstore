import Swal from 'sweetalert2'

export default {
  methods: {
    showAlert(options) {
      return Swal.fire({
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        confirmButtonColor: '#644949',
        ...options
      })
    }
  }
}

export const showAlert = (options)=>{
  return Swal.fire({
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    confirmButtonColor: '#644949',
    ...options
  })
} 
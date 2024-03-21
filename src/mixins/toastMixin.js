import Swal from 'sweetalert2'

export default {
  methods: {
    showToast(options) {
      if (window.matchMedia('(max-width: 767px)').matches) {
        return Swal.mixin({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          ...options
        }).fire()
      } else {
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
}

export const showToast = (options) => {
  if (window.matchMedia('(max-width: 767px)').matches) {
    return Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      ...options
    }).fire()
  } else {
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

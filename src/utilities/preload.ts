const preload = (src: string) => {
    return new Promise(function(resolve) {
      let img = new Image()
      img.onload = resolve
      img.src = src
    })
}

export default preload;
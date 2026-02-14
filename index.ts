// Type declarations for global objects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const L: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const $: any

// Extend window interface for legacy map property
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map?: any
  }
}

function round(number: number, precision: number): number {
  const shift = function (num: number, precis: number, reverseShift?: boolean): number {
    if (reverseShift) {
      precis = -precis
    }
    const numArray = ('' + num).split('e')
    return +(
      numArray[0] + 'e' + (numArray[1] ? +numArray[1] + precis : precis)
    )
  }
  return shift(Math.round(shift(number, precision, false)), precision, true)
}

function mstomph(ms: number): number { 
  return ms * 2.23694 
}

window.onload = function (): void {
  navigator.geolocation.getCurrentPosition(function (position: GeolocationPosition): void {
    window.map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 10);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(window.map);
    setInterval(updater, 7000)
    updater()
  })
}

function randomFromXtoY(x: number, y: number): number {
  const r = round(Math.random() * (y - x), 0)
  console.log(r + x)
  return r + x
}

function updater(): void {
  navigator.geolocation.getCurrentPosition(function(l2: GeolocationPosition): void {
    console.log(l2)
    const speed = round(mstomph(l2.coords.speed || 0), 2)
    $('h2.answer').text(`${speed} mph`)
    window.map.setView([l2.coords.latitude, l2.coords.longitude], randomFromXtoY(9, 15));
    // const marker = L.marker([l2.coords.latitude, l2.coords.longitude]).addTo(window.map);
  })
}

export {}

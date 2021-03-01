export default {
  data() {
    return {
      tmdbGenreIDs: [
        {
          id: 28,
          name: 'Action'
        },
        {
          id: 12,
          name: 'Abenteuer'
        },
        {
          id: 16,
          name: 'Animation'
        },
        {
          id: 35,
          name: 'Komödie'
        },
        {
          id: 80,
          name: 'Krimi'
        },
        {
          id: 99,
          name: 'Dokumentarfilm'
        },
        {
          id: 18,
          name: 'Drama'
        },
        {
          id: 10751,
          name: 'Familie'
        },
        {
          id: 14,
          name: 'Fantasy'
        },
        {
          id: 36,
          name: 'Historie'
        },
        {
          id: 27,
          name: 'Horror'
        },
        {
          id: 10402,
          name: 'Musik'
        },
        {
          id: 9648,
          name: 'Mystery'
        },
        {
          id: 10749,
          name: 'Liebesfilm'
        },
        {
          id: 878,
          name: 'Science Fiction'
        },
        {
          id: 10770,
          name: 'TV-Film'
        },
        {
          id: 53,
          name: 'Thriller'
        },
        {
          id: 10752,
          name: 'Kriegsfilm'
        },
        {
          id: 37,
          name: 'Western'
        }
      ]
    }
  },
  methods: {
    mapGenreIDs(passedIds) {
      const newArray = []
      passedIds.forEach(id => {
        newArray.push(
          this.tmdbGenreIDs.filter(tmbdGenre => tmbdGenre.id === id)[0].name
        )
      })
      return newArray
    },
    minutesToSeconds(timeString) {
      return timeString.split(':').reduce((acc, time) => 60 * acc + +time)
    }
  }
}

import useMovieStore from "./movie";
import useUserStore from "./user";
import useCinemaStore from "./cinema";
import useNewsStore from "./news";


export default function useStore() {
  return {
    userStore: useUserStore(),
    movieStore: useMovieStore(),
    cinemaStore: useCinemaStore(),
    newsStore: useNewsStore()
  }
}
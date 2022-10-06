import useMovieStore from "./movie";
import useUserStore from "./user";
import useCinemaStore from "./cinema";
import useNewsStore from "./news";
import useOrderStore from './order'


export default function useStore() {
  return {
    userStore: useUserStore(),
    movieStore: useMovieStore(),
    cinemaStore: useCinemaStore(),
    newsStore: useNewsStore(),
    orderStore: useOrderStore()
  }
}
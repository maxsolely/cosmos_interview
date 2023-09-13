import { HttpLink } from '@apollo/client';
import {
 NextSSRInMemoryCache,
 NextSSRApolloClient
} from '@apollo/experimental-nextjs-app-support/ssr';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

let client: NextSSRApolloClient<any> | null = null;

export const { getClient } = registerApolloClient(() => {
 // create a new client if there's no existing one
 // or if we are running it on the server
 if (!client || typeof window === 'undefined') {
  return new NextSSRApolloClient({
   cache: new NextSSRInMemoryCache(),
   link: new HttpLink({
    uri: 'http://localhost:4000'
    // fetchOptions: { cache: "no-store" },
   })
  });
 }
 return client;
});

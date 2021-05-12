import type {ImagePrimitive} from './ImagePrimitive';

// export declare namespace Project {
  export type Project = {
    amount: number,
    collected_amount: number,
    created_at: string,
    description: string,
    email: string,
    gallery: ImagePrimitive[],
    link: [
      {
        source: string,
        url: string
      }
    ],
    loan_request_id: string,
    logo: ImagePrimitive,
    preview: ImagePrimitive,
    roadmap: [
      {
        date_end: string,
        date_start: string,
        description: string,
        name: string
      }
    ],
    site: string,
    small_description: string,
    status: string,
    team: [
      {
        image: ImagePrimitive,
        links: [
          {
            source: string,
            url: string
          }
        ],
        name: string,
        position: string,
        skills: string
      }
    ],
    title: string,
    user_id: string,
    uuid: string,
    video_link: string
  }
// }

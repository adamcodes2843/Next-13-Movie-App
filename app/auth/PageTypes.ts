type SessionUserObject = {
    name: string,
    email: string,
    image?: string
}

export interface SessionType{
    user: SessionUserObject
}

export interface ReviewType {
    id: string,
    movie: string,
    title: string,
    rating: number,
    review: string,
    voteCount: number,
    upVotes: string[],
    downVotes: string[],
    dateTimePosted: Date,
    dateTimeUpdated: Date | null,
    comments: CommentsType,
    userId: string
}

export interface CommentType {
    id: string,
    comment: string,
    userId: string,
    reviewId: string,
    voteCount: number,
    dateTimePosted: Date,
    dateTimeUpdated: Date | null
}

export type SettingsType = {
    id: string,
    colorTheme: string,
    darkMode: boolean,
    view: string,
    userId: string,
    allowComments: boolean
}

export interface ReviewsType extends Array<ReviewType>{}
export interface CommentsType extends Array<CommentType>{}
export type UserType = null | undefined | UserObject

export interface UserObject {
    id: string,
    name: string | null,
    displayName: string | null,
    email: string | null,
    emailVerified: Date | null,
    image: string | null,
    accounts?: [],
    sessions?: [],
    reviews?: ReviewsType,
    comments?: CommentsType,
    settings?: SettingsType,
    favoriteMovie: string | null,
    favoritePizza: string | null
    xp?: number
}

export interface MovieType {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}
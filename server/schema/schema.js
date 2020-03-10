const graphql = require('graphql');
const _ = require('lodash');

const 
{ 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

// dummy data
var songs = [
    {id: "1", title: "Alimango", genre: "Rock", artist_id: '1', album: "Alimango Salad"},
    {id: "2", title: "Black Sheep", genre: "Rock", artist_id: '1', album: "Alimango Salad"},
    {id: "3", title: "Maalaala mo kaya", genre: "Rock", artist_id: '2', album: "Release"},
    {id: "4", title: "Permanent Change", genre: "Alternative Rock", artist_id: '1', album: "Alimango Salad"},
    {id: "5", title: "Osige", genre: "Alternative Rock", artist_id: '1', album: "Alimango Salad"},
    {id: "6", title: "Kaibigan", genre: "Alternative Rock", artist_id: '1', album: "Alimango Salad"},
    {id: "7", title: "Kamusta", genre: "Alternative Rock", artist_id: '2', album: "Release"},
    {id: "8", title: "Pagsisisi", genre: "Mellow", artist_id: '2', album: "Release"},
    {id: "9", title: "Shut up", genre: "Alternative", artist_id: '3', album: "HighSchool"},
    {id: "10", title: "Purple's so sad so lonely he's gonna cry", genre: "Dark Mellow", artist_id: '4', album: "HighSchool Comps"},
];

var artists = [
    { id: "1", name: "Long Bond Yellow Papers", year_started: 2008},
    { id: "2", name: "LBYP", year_started: 2008},
    { id: "3", name: "The Classmates", year_started: 2005},
    { id: "4", name: "The Flowers", year_started: 2005},
];

const SongType = new GraphQLObjectType({
    name: 'Song',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type : GraphQLString },
        album: { type : GraphQLString },
        artist: {
            type: ArtistType,
            resolve(parent, args){
                return _.find(artists, { id: parent.artist_id });
            }
        }
    })
});

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        year_started: { type: GraphQLInt },
        books: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                return _.filter(songs, {artist_id: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        song: {
            type: SongType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
               return _.find(songs, { id: args.id });
            }
        },
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return _.find(artists, { id: args.id });
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve() {
                return songs;
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve() {
                return artists;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
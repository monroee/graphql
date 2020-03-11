const graphql = require('graphql');
const _ = require('lodash');

const Song = require('../models/song');
const Artist = require('../models/artist');

const 
{ 
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//#region dummy data
// dummy data
// var songs = [
//     {id: "1", title: "Alimango", genre: "Rock", artist_id: '1', album: "Alimango Salad"},
//     {id: "2", title: "Black Sheep", genre: "Rock", artist_id: '1', album: "Alimango Salad"},
//     {id: "3", title: "Maalaala mo kaya", genre: "Rock", artist_id: '2', album: "Release"},
//     {id: "4", title: "Permanent Change", genre: "Alternative Rock", artist_id: '1', album: "Alimango Salad"},
//     {id: "5", title: "Osige", genre: "Alternative Rock", artist_id: '1', album: "Alimango Salad"},
//     {id: "6", title: "Kaibigan", genre: "Alternative Rock", artist_id: '1', album: "Alimango Salad"},
//     {id: "7", title: "Kamusta", genre: "Alternative Rock", artist_id: '2', album: "Release"},
//     {id: "8", title: "Pagsisisi", genre: "Mellow", artist_id: '2', album: "Release"},
//     {id: "9", title: "Shut up", genre: "Alternative", artist_id: '3', album: "HighSchool"},
//     {id: "10", title: "Purple's so sad so lonely he's gonna cry", genre: "Dark Mellow", artist_id: '4', album: "HighSchool Comps"},
// ];

// var artists = [
//     { id: "1", name: "Long Bond Yellow Papers", year_started: 2008},
//     { id: "2", name: "LBYP", year_started: 2008},
//     { id: "3", name: "The Classmates", year_started: 2005},
//     { id: "4", name: "The Flowers", year_started: 2005},
// ];
//#endregion

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
                return Artist.findById(parent.artist_id);
                //return _.find(artists, { id: parent.artist_id });
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
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                return Song.find({ artist_id: parent.id });
                //return _.filter(songs, {artist_id: parent.id})
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
                return Song.findById(args.id);
              //return _.find(songs, { id: args.id });
            }
        },
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Artist.findById(args.id);
                //return _.find(artists, { id: args.id });
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve() {
                return Song.find({});
                //return songs;
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve() {
                return Artist.find({});
                //return artists;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addArtist: {
            type: ArtistType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                year_started: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let artist = new Artist({
                    name: args.name,
                    year_started: args.year_started
                });
                return artist.save();
            }
        },
        addSong: {
            type: SongType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                album: { type: new GraphQLNonNull(GraphQLString) },
                artist_id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let song = new Song({
                    title: args.title,
                    genre: args.genre,
                    album: args.album,
                    artist_id: args.artist_id
                })
                return song.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
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
                return Song.find({ artist_id: parent.id }).sort({ title: 1 });
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
            }
        },
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args){
                return Artist.findById(args.id);
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve() {
                return Song.find({}).sort({ title: 1 });
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve() {
                return Artist.find({}).sort({ name: 1 });
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
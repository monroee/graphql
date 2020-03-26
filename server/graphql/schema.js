const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} = graphql;

const Song = require("../models/song");
const Artist = require("../models/artist");


// TYPES
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

// QUERIES
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    song: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Song.findById(args.id);
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({}).sort({ title: 1 });
      }
    },
    artist: {
      type: ArtistType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Artist.findById(args.id);
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

// MUTATIONS
const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
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
        });
        return song.save();
      }
    },
    updateSong: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        album: { type: new GraphQLNonNull(GraphQLString) },
        artist_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const where = { _id: args.id };
        const update = { title: args.title, genre: args.genre, album: args.album, artist_id: args.artist_id };
        return Song.findOneAndUpdate(where, update, { new: true });
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        const where = { _id: args.id };
        return Song.findOneAndDelete(where);
      }
    },
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
    updateArtist: {
      type: ArtistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        year_started: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const where = { _id: args.id };
        const update = { name: args.name, year_started: args.year_started };
        return Artist.findOneAndUpdate(where, update, { new: true });
      }
    },
    deleteArtist: {
      type: ArtistType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        const where = { _id: args.id };
        return Artist.findOneAndDelete(where);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

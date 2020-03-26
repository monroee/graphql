const graphql = require('graphql');

const 
{ 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
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

module.exports = { SongType, ArtistType };
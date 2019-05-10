const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArtcileSchema = new Schema({
    authorId:          { type: Number, required: true, max: 100 },
    body:              { type: String, required: true },
    commentsDisabled:  { type: Boolean, required: true },
    createdAt:         { type: String, required: true },
    draft:             { type: Boolean, required: true },
    editedAt:          { type: String, required: true },
    htmlUrl:           { type: String, required: true },
    zdId:              { type: Number, required: true, max: 100 },
    label_names:       { type: Array, required: true },
    locale:            { type: String, required: true },
    name:              { type: String, required: true },
    outdated:          { type: Boolean, required: true },
    outdatedLocales:   { type: Array, required: true },
    permissionGroupId: { type: Number, required: true },
    position:          { type: Number, required: true },
    promoted:          { type: Boolean, required: true },
    sectionId:         { type: Number, required: true },
    sourceLocale:      { type: String, required: true },
    title:             { type: String, required: true },
    updatedAt:         { type: String, required: true },
    url:               { type: String, required: true },
    userSegmentId:     { type: Number, required: true },
    voteCount:         { type: Number, required: true },
    voteSum:           { type: Number, required: true },
});

// Export the model
module.exports = mongoose.model('Article', ArtcileSchema);
const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

// ThoughtRoutes object contains methods for handling all API routes related to thoughts
const thoughtRoutes = {

// Get all thoughts
  async getAllThoughts(req, res) {
      const thoughts = await Thought.find({});
      res.json(thoughts);
  },

  // Get a thought through a specific ID
  async getThoughtsById(req, res) {
      const thought = await Thought.findOne({_id:req.params.thoughtId});
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
   
  },
  // Create a new thought
  async createThought(req, res) {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought);
  },
  
  // Delete a thought
  async deleteThought(req,res) {
        const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
        res.status(200).json(thought);
  },

  // Update a thought's content
  async updateThoughtById(req, res) {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        res.status(404).json({ message: 'Thought not found' });
      } else {
        res.json(thought);
      }
    },

  // Create new reaction (response to the thought)
  async createReaction(req, res) {
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        thought ? res.json(thought) : res.status(404).json({message: notFound});
  },

// Delete a reaction
  async deleteReaction(req, res) {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        thought ? res.json(thought) : res.status(404).json({message: notFound});
    },
  }

// Export ThoughtController
module.exports = thoughtRoutes;
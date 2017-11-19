var should = require('should'),
    sinon = require('sinon');

describe('Book controller tests', function(){
    describe('Post', function(){
        it('Should not allow an empty title on post', function(){
            var Book = function(book){this.save = function(){}};

            var req = {
                body: {
                    author: 'Scott M'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }


            var bookControllers = require('../controllers/bookControllers')(Book);
            bookControllers.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})
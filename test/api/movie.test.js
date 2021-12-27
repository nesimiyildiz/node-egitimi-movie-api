const chai=require('chai')
const chaiHttp=require('chai-http');
const should=chai.should();
const server=require('../../app')
chai.use(chaiHttp);
let token;
let movieId;
describe('/api/movies tests',()=>{
    before((done) => {
      chai.request(server)
          .post('/authenticate')
          .send({username:'sergenyalcin',password:'1234567'}).end((err,res)=>{
              token=res.body.token;

              done();
      })
    });

    describe('/GET movies',()=>{
        it('it should GET All the Movies',(done)=>{
            chai.request(server).get('/api/movies')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done();
                })

        })
    })

    describe('/POST movie',()=>{
        it('it should POST a movie',(done)=>{
            const movie={
                title:'deneme 2',
                director_id:'61c77a1aa934e3d820400e80',
                category:'Komedi',
                country:'Turkey',
                year:1950,
                imdb_score:8
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie,done())
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId=res.body._id;
                    done();
                })
        })
    })

    describe('/GET/:director_id move',()=>{
        it('it should get a movie by th hive id',(done)=>{
            chai.request(server)
                .get('/api/movies'+movieId,done())
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                })
        })
    })

})

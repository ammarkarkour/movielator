import React from 'react';
import {VStack,HStack,Input,Button,Box,Text,Image} from "@chakra-ui/react";


class GetMovie extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.setMoviesState = this.setMoviesState.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
    this.state = {
      value    :'', 
      title    :'',
      poster   :'',
      imdbR_t  :'',
      imdbR_v  :'',
      plot     :'',
      stars    :'',
      director :'',
      genre    :''};
    this.baseState = this.state
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  setMoviesState(m) {
    this.setState({
      title    : m['Title'],
      poster   : m['Poster'],
      imdbR_t  : 'IMDb Rating:',
      imdbR_v  : m['imdbRating'],
      plot     : m['Plot'],
      stars    : 'Stars: ' + m['Actors'],
      director : 'Director: ' + m['Director'],
      genre    : m['Genre']
      });
  }

  fetchInfo() {
    let searchName = this.state.value;
    let jsonDic = fetch('https://www.omdbapi.com/?t='+searchName+'&apikey=bf9295ce')
    .then(res =>  res.json())
    .then(res => {
        if (res["Title"]) {
          this.setMoviesState(res);
        } else {
          this.setState(this.baseState)}})
    .catch(error => this.setState(this.baseState));
  }

  render() {
    return (
        
      <VStack spacing="10px">
        <Box w="100%" p={70} color="white">
        </Box>

        <Text fontSize="30px" color="#363636"  fontWeight="bold">
          MOVIELATOR
        </Text>
        
        <HStack spacing="10px">
          <Input
            w = "450px"
            h = "30px"
            borderRadius="30px"
            placeholder=" Enter movie name!"
            value={this.state.value}
            onChange={this.handleChange}
          />

          <Button 
            w="80px"
            h="35px"
            borderRadius="30px" 
            fontWeight="bold"
            onClick={this.fetchInfo}
            >
            Find
          </Button>
        </HStack>

        <Box 
          w="700px"
          h="445px"
          borderRadius="30px"
          bg="#363636"
          p={4}
          color="white"
          >

          <HStack spacing="10px" alignItems="start">
            <Image 
              borderRadius="30px"
              src={this.state.poster}
              alt={this.state.value} />

              <VStack spacing="10px" alignItems="start">
                <Text fontSize="30px" color="white" fontWeight="bold">
                  {this.state.title}
                </Text>

                <HStack spacing="20px" alignItems="center" p={0}>
                  <Text fontSize="20px" color="white">
                    {this.state.imdbR_t}
                  </Text>

                  <Text fontSize="20px" color="#E5BC46" fontWeight="bold">
                    {this.state.imdbR_v}
                  </Text>
                </HStack>

                <Text fontSize="15px" color="#A5A5A5">
                  {this.state.plot}
                </Text>

                <Text fontSize="15px" color="#A5A5A5">
                  {this.state.stars}
                </Text>

                <Text fontSize="15px" color="#A5A5A5">
                  {this.state.director}
                </Text>
                
                <Text fontSize="20px" color="#E5BC46" fontWeight="bold">
                  {this.state.genre}
                </Text>
              </VStack>

          </HStack>

        </Box>
      </VStack>

    )
  }
}

export default GetMovie;


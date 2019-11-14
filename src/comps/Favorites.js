import React from 'react';
import { connect } from 'react-redux'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { updateUnit, getFavorite, loadWeather, loadFavoriteWeather, addFavorite, loadCity, setTrueFromFavorite, getCityName } from '../actions';
import Loading from './Loading'

class Favorites extends React.Component {

    componentDidUpdate(prevProps) {
        const {
            myFavorites,
            unit
        } = this.props
        let favoritesArray = this.props.myFavorites
        if (favoritesArray === undefined) {

        } else {
            debugger
            var type =( typeof this.props.myFavorites)
            console.log(type);
            debugger
            if (type === "string") {
                myFavorites = JSON.parse(favoritesArray)
                }
                if (myFavorites !== prevProps.myFavorites ||
                    unit !== prevProps.unit) {
                        debugger
                        const { loadFavoriteWeather } = this.props
                    loadFavoriteWeather(myFavorites, unit)
            }


        }
    }

    render() {
        if (this.props.favoritesWeather.length === undefined || this.props.favoritesWeather.length === 0 || this.props.favoritesWeather.length !== this.props.myFavorites.length) {
            return (
                <>
                    <Loading />
                </>
            )
        } else if (this.props.favoritesWeather.length === this.props.myFavorites.length) {
            return (
                <div>
                    <hi className='favoritesText text-primary'>Favorites</hi>

                    {this.props.favoritesWeather.map(w =>
                        <Card key={w.key} className='favoritesCards' >
                            <CardBody>
                                <CardTitle onClick={this.getFavWeather.bind(this, w.DailyForecasts[0].key, w.DailyForecasts[0].city)}>{w.DailyForecasts[0].city}</CardTitle>
                                <CardText><img src={w.DailyForecasts[0].Day.Icon}></img>
                                </CardText>
                                <CardText>{w.DailyForecasts[0].Temperature.Minimum.Value} °{w.DailyForecasts[0].Temperature.Minimum.unit} </CardText>
                                <Button className="btn-round btn-icon" color="primary" onClick={this.removeFromFavorites.bind(this, w.DailyForecasts[0].city)}>
                                    <i className="fa fa-trash-alt" />
                                </Button>
                            </CardBody>
                        </Card>
                    )}</div>
            );
        }
    }

    getFavWeather(cityKey, cityName) {
        const { loadWeather, setTrueFromFavorite, getCityName } = this.props
        loadWeather(cityKey, this.props.unit)
        setTrueFromFavorite(true)
        getCityName(cityName)
        this.props.history.push('/home')
    }
    removeFromFavorites(city) {

        let myRemoved = this.props.myFavorites
        myRemoved = myRemoved.filter(c => c.name != city);
        if (myRemoved.length === 0) {
            const { addFavorite } = this.props
            addFavorite('')
        } else {
            for (let i = 0; i < myRemoved.length; i++) {
                const { addFavorite, loadFavoriteWeather } = this.props
                addFavorite(myRemoved[i]);
                var myfaveArray = this.props.myFavorites;
                if (typeof myfaveArray === 'string') {
                    myfaveArray = JSON.parse(myfaveArray)
                    loadFavoriteWeather(myfaveArray, this.props.unit)
                }
                else {
                    loadFavoriteWeather(this.props.myFavorites, this.props.unit)
                }
            }

        }

    }
}


const mapStateToProps = (state) => {
    return {
        citysuggetions: state.citySuggetions.citySuggetions,
        favoritesWeather: state.favoritesWeather.favoritesWeather,
        myFavorites: state.myFavorites.myFavorites,
        unit: state.unit.unit,
    }
}

const mapDispatchToProps = {
    updateUnit,
    getFavorite,
    loadFavoriteWeather,
    addFavorite,
    loadCity,
    loadWeather,
    getCityName,
    setTrueFromFavorite
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
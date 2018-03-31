function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function compareNumbers(a, b) {
    return a - b;
}

class App extends React.Component {
    componentWillMount() {
        this.setState({
            data: [],
            series: ['France', 'Italy', 'England', 'Sweden', 'Germany'],
            labels: ['cats', 'dogs', 'horses', 'ducks', 'cows'],
            colors: ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C']
        })
    }

    componentDidMount() {
        this.populateArray();
        setInterval(this.populateArray.bind(this), 2000);
    }

    populateArray() {
        const series = 5;
        const serieLength = 5;

        let data = new Array(series).fill(new Array(serieLength).fill(0));
        data = data.map(serie => serie.map(item => getRandomInt(0, 20)));

        this.setState({data});
    }

    render() {
        const {data, colors, labels, series} = this.state;
        const max = data.reduce((max, serie) => Math.max(max, serie.reduce((serieMax, item) => Math.max(serieMax, item), 0)), 0);
        const props = {
            chartSerieModyfier: '',
            style: {height: 250},
            chartsClass: 'Charts',
            data: data,
            series: series,
            colors: colors,
            max: max,
            itemStyle: 0
        }

        return (
            <section>
                <Charts
                    {...props}
                />

                <Charts
                    {...props}
                    chartSerieModyfier={'stacked'}
                    itemStyle={1}
                />

                <Charts
                    {...props}
                    chartSerieModyfier={'layered'}
                    itemStyle={2}
                />

                <Charts
                    {...props}
                    chartSerieModyfier={''}
                    style={{ height: 'auto' }}
                    chartsClass={'Charts horizontal'}
                    itemStyle={3}
                />

                <Legends labels={labels} colors={colors}/>
            </section>
        );
    }
}

class Charts extends React.Component {
    constructor(props) {
        super(props);
        console.log('props', props)
    }

    getCharts() {
        const charts = this.props.data.map((serie, serieIndex) => {
            var sortedSerie = serie.slice(0),
                sum;

            sum = serie.reduce((carry, current) => carry + current, 0);
            sortedSerie.sort(compareNumbers);

            return (
                <ChartSerie
                    chartSerieModyfier={this.props.chartSerieModyfier}
                    key={ serieIndex }
                    style={this.props.style}
                    series={this.props.series}
                    serieIndex={serieIndex}
                    colors={this.props.colors}
                    serie={serie}
                    max={this.props.max}
                    itemClass={'Charts--item'+ ' '+this.props.chartSerieModyfier}
                    sortedSerie={sortedSerie}
                    sum={sum}
                    itemStyle={this.props.itemStyle}
                />
            );
        })
        return charts;
    }

    render() {
        return (
            <div className={this.props.chartsClass}>
                { this.getCharts() }
            </div>
        )
    }
}

class ChartSerie extends React.Component {
    constructor(props) {
        super(props)
    }

    getItems() {
        return (
            this.props.serie.map((item, itemIndex) => {
                var color = this.props.colors[itemIndex], style,
                    size = this.props.chartSerieModyfier == 'stacked' ? item / this.props.sum * 100 : item / (this.props.max) * 100;
                const styles = [
                    {
                        backgroundColor: color,
                        opacity: 1,
                        zIndex: item,
                        height: size + '%'
                    },

                    {
                        backgroundColor: color,
                        opacity: 1,
                        zIndex: item,
                        height: size + '%'
                    },
                    {
                        backgroundColor: color,
                        opacity: (item / this.props.max + .05),
                        zIndex: item,
                        height: size + '%',
                        right: ((this.props.sortedSerie.indexOf(item) / (this.props.serie.length + 1)) * 100) + '%'
                    },
                    {
                        backgroundColor: color,
                        opacity: (item / this.props.max + .05),
                        zIndex: item,
                        width: size + '%'
                    },

                ];
                style = styles[this.props.itemStyle]

                return (
                    <ChartItem
                        key={ itemIndex }
                        style={ style }
                        color={color}
                        item={item}
                        itemClass={this.props.itemClass}
                    />
                )
            }));

    }


    render() {
        const items = this.getItems();
        return (
            <div className={'Charts--serie' + ' ' + this.props.chartSerieModyfier}
                 style={this.props.style}
            >
                <label>{ this.props.series[this.props.serieIndex] }</label>
                { items }
            </div>
        );
    }
}

class Legends extends React.Component {
    constructor(props) {
        super(props);
    }

    getItems() {
        const items = this.props.labels.map((label, labelIndex) => {
            return (
                <div>
                    <span className="Legend--color"
                          style={{ backgroundColor: this.props.colors[labelIndex % this.props.colors.length]  }}/>
                    <span className="Legend--label">{ label }</span>
                </div>)
        });
        return items;
    }

    render() {

        return (
            <div className="Legend">
                { this.getItems() }
            </div>)

    }
}

class ChartItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                className={this.props.itemClass}
                style={ this.props.style }
            >
                <b style={{ color: this.props.color }}>{ this.props.item }</b>
            </div>
        );
    }
}

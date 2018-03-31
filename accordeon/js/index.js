'use strict';
const content = [
    {
        title: 'Компоненты',
        text: 'Каждый компонент являются законченной частью пользовательского интерфейса и сам управляет своим состоянием, а композиция компонентов (соединение) позволяет создавать более сложные компоненты. Таким образом, создается иерархия компонентов, причем каждый отдельно взятый компонент независим сам по себе. Такой подход позволяет строить сложные интерфейсы, где есть множество состояний, и взаимодействовать между собой.'
    },
    {
        title: 'Выучил раз, используй везде!',
        text: 'После изучения React вы сможете использовать его концепции не только в браузере, но также и при разработке мобильных приложений с использованием React Native.'
    },
    {
        title: 'Использование JSX',
        text: 'JSX является языком, расширяющим синтаксис стандартного Javascript. По факту он позволяет писать HTML-код в JS-скриптах. Такой подход упрощает разработку компонентов и повышает читаемость кода.'
    }
]

class Section extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <section className="section">
                <button onClick={this.props.onClick}>toggle</button>
                <h3 className="sectionhead">{this.props.content.title}</h3>
                <div className="articlewrap">
                    <div class="article">{this.props.content.text}</div>
                </div>
            </section>
        )
    }
}

class Accordian extends React.Component {
    constructor(props) {
        super(props);
        console.log('this.props', this.props)
    }


    render() {
        return (
            <main className="main" items={content}>
                <Title title={this.props.children[0].props.title}/>
                {this.props.children[0](this.props.items)}
            </main>
        )
    }

}


// class Sections extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//     handleClick(e){
//         console.log('e', e.target);
//     }
//
//     render() {
//         const sections = this.props.content.map((item, index) => {
//             return <Section content={item} key={index} onClick={this.handleClick}/>
//         });
//         console.log('sections', sections)
//
//         return (
//             <div>{sections}</div>
//         )
//     }
// }

const Title = (props)=> {
    return (
        <h2 className="title">{props.title}</h2>
    )
}
ReactDOM.render(
    <Accordian items={content}>
        <Title title={'React'}/>
        {items => items.map((item, index)=>  <Section content={item} key={index} onClick={this.toggle}/>
        )}
    </Accordian>,
    document.getElementById('accordian'));
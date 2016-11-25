var cy = cytoscape({

    container: document.getElementById('cy'),

    elements: [],

    style: [{
        selector: "node[category='mRNA']",
        style: {
            'background-color': 'blue',
            'label': 'data(id)',
            'width': 6,
            'height': 6,
            "font-size": 1
        }
    }, {
        selector: "node[category='miRNA']",
        style: {
            'background-color': 'red',
            'label': 'data(id)',
            'width': 6,
            'height': 6,
            "font-size": 1,
            "shape": "rectangle"
        }
    }, {
        selector: "node[category='lncRNA']",
        style: {
            'background-color': 'black',
            'label': 'data(id)',
            'width': 6,
            'height': 6,
            "font-size": 1,
            "shape": "triangle"
        }
    }, {
        selector: "edge[category=1]",
        style: {
            'width': 2,
            'line-color': '#555',
            'target-arrow-color': '#555',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'none',
            'line-style': 'dotted'
        }
    }, {
        selector: "edge[category=2]",
        style: {
            'width': 2,
            'line-color': '#555',
            'curve-style': 'bezier',
            'target-arrow-color': '#555',
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'none',
            'line-style': 'dashed'
        }
    }, {
        selector: "edge[category=3]",
        style: {
            'width': 2,
            'line-color': '#555',
            'curve-style': 'bezier',
            'target-arrow-color': '#555',
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'none',
            'line-style': 'solid'
        }
    }, {
        selector: "node[category='miRNA'].highlight",
        style: {
            'border-color': 'green',
            'border-width': '2px',
            'color': 'red'
        }
    }, {
        selector: "node[category='mRNA'].highlight",
        style: {
            'border-color': 'red',
            'border-width': '2px',
            'color': 'blue'
        }
    }, {
        selector: "node[category='lncRNA'].highlight",
        style: {
            'border-color': 'blue',
            'border-width': '2px',
            'color': 'green'
        }
    }, {
        selector: 'node.semitransp',
        style: {
            'opacity': '0.5'
        }
    }, {
        selector: 'edge.semitransp',
        style: {
            'opacity': '0.5'
        }
    }, {
        selector: "edge[category=3].highlight",
        style: {
            'target-arrow-color': 'blue',
            'line-color': 'blue',
        }
    }, {
        selector: "edge[category=2].highlight",
        style: {
            'target-arrow-color': 'red',
            'line-color': 'red',
        }
    }, {
        selector: "edge[category=1].highlight",
        style: {
            'target-arrow-color': 'green',
            'line-color': 'green',
        }
    }, ]
});

cy.add(insertdata)

cy.elements().layout({
    name: 'concentric'
})
cy.zoom({
    level: 1
})
cy.center()
cy.on('tap', 'node', function(e) {
    var sel = e.cyTarget;
    cy.elements().removeClass('semitransp')
    cy.elements().removeClass('highlight')
    cy.elements().difference(sel.neighborhood()).not(sel).addClass('semitransp')
    sel.addClass('highlight').neighborhood().addClass('highlight')
})
cy.on('cxttap', function(e) {
    rmClass()
})

function rmClass() {
    cy.elements().removeClass('semitransp')
    cy.elements().removeClass('highlight')
}

$("#ipt input").bind('keydown', function(e) {
    if (e.which == 13) {
        rmClass()
        item_name = $("#ipt input").val().toLowerCase()
        cy.elements().forEach(function(element) {
            if (element.id().toLowerCase() == item_name) {
                cy.center(element)
                element.addClass('highlight')
            }
        }, this);
    }
    // console.log(item_name)
})

function restore() {
    hide_node.forEach(function(element) {
        cy.add(element)
    }, this);
}

var hide_node = new Array()

$('#mRNAcheck').change(function() {
    if ($(this).is(":checked")) {
        var temp_array = new Array();
        for (var i = 0; i < hide_node.length; i++) {
            element = hide_node[i]
            if (element.isEdge()) {
                if (element.source().attr("category") == 'mRNA' && element.target().attr("category") == 'mRNA') {
                    if (hide_node.indexOf(element.source())) {
                        cy.add(element.source())
                        temp_array.push(i)
                    }
                    if (hide_node.indexOf(element.target())) {
                        cy.add(element.target())
                        temp_array.push(i)
                    }
                    cy.add(element)
                    temp_array.push(i)
                }
            }
        }
        temp_array.forEach(function(element) {
            hide_node.splice(element, 1)
        }, this);
    } else {
        cy.elements().forEach(function(element) {
            if (element.isEdge()) {
                if (element.source().attr("category") == 'mRNA' && element.target().attr("category") == 'mRNA') {
                    hide_node.push(element)
                    cy.remove(element)
                }
            }
        }, this);
        cy.elements().forEach(function(element) {
            if (element.isNode()) {
                if (element.neighborhood().length === 0) {
                    hide_node.push(element)
                    cy.remove(element)
                }
            }
        }, this);
    }
});

$('#miRNAcheck').change(function() {
    if ($(this).is(":checked")) {
        var temp_array = new Array();
        for (var i = 0; i < hide_node.length; i++) {
            element = hide_node[i]
            if (element.isEdge()) {
                if (element.source().attr("category") == 'miRNA' || element.target().attr("category") == 'miRNA') {
                    if (hide_node.indexOf(element.source())) {
                        cy.add(element.source())
                        temp_array.push(i)
                    }
                    if (hide_node.indexOf(element.target())) {
                        cy.add(element.target())
                        temp_array.push(i)
                    }
                    cy.add(element)
                    temp_array.push(i)
                }
            }
        }
        temp_array.forEach(function(element) {
            hide_node.splice(element, 1)
        }, this);
    } else {
        cy.elements().forEach(function(element) {
            if (element.isEdge()) {
                if (element.source().attr("category") == 'miRNA' || element.target().attr("category") == 'miRNA') {
                    hide_node.push(element)
                    cy.remove(element)
                }
            }
        }, this);
        cy.elements().forEach(function(element) {
            if (element.isNode()) {
                if (element.neighborhood().length === 0) {
                    hide_node.push(element)
                    cy.remove(element)
                }
            }
        }, this);
    }
});

$("#relogout").click(function() {
    cy.elements().layout({
        name: 'concentric'
    })
    cy.zoom({
        level: 1
    })
    cy.center()
})

$("#ipt").draggable()

$(document).keyup(function(event) {

    switch (event.keyCode) {
        case 27:
            rmClass();
        case 96:
            rmClass();
    }
});
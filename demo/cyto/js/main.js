var hide_node = new Array()

$("#ipt").draggable()

var cy = cytoscape({

    container: document.getElementById('cy'),

    elements: [],

    style: [{
        selector: "node[category='mRNA']",
        style: {
            'background-color': 'blue',
            'label': 'data(id)',
            'width': 10,
            'height': 10,
            "font-size": 1,
        }
    }, {
        selector: "node[category='miRNA']",
        style: {
            'background-color': 'red',
            'label': 'data(id)',
            'width': 10,
            'height': 10,
            "font-size": 1,
            "shape": "rectangle"
        }
    }, {
        selector: "node[category='lncRNA']",
        style: {
            'background-color': 'green',
            'label': 'data(id)',
            'width': 10,
            'height': 10,
            "font-size": 1,
            "shape": "star"
        }
    }, {
        selector: "edge[category=1]",
        style: {
            'width': 2,
            'line-color': '#888',
            'target-arrow-color': '#888',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'none',
            'line-style': 'dotted'
        }
    }, {
        selector: "edge[category=2]",
        style: {
            'width': 2,
            'line-color': '#888',
            'curve-style': 'bezier',
            'target-arrow-color': '#888',
            'target-arrow-shape': 'triangle',
            'source-arrow-shape': 'none',
            'line-style': 'dashed'
        }
    }, {
        selector: "edge[category=3]",
        style: {
            'width': 2,
            'line-color': '#888',
            'curve-style': 'bezier',
            'target-arrow-color': '#888',
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
            'color': 'darkblue'
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

function relogout() {
    cy.elements().layout({
        // name: 'cose-bilkent',
        // nodeRepulsion: 30000,
        ready: function() {
            $("#loadding").hide(150)
            $("#cy").show(150)
            $("#ipt").show(150)
        },
    })
    cy.zoom({
        level: 1
    })
    cy.center()
}

cy.on('tap', 'node', function(e) {
    var sel = e.cyTarget;
    cy.elements().removeClass('semitransp')
    cy.elements().removeClass('highlight')
    cy.elements().difference(sel.neighborhood()).not(sel).addClass('semitransp')
    sel.addClass('highlight').neighborhood().addClass('highlight')
        // cy.elements().forEach(function(element) {
        //     console.log(element.id())
        //     console.log(element.position())
        // }, this);
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

$('#lncRNAcheck').change(function() {
    if ($(this).is(":checked")) {
        var temp_array = new Array();
        for (var i = 0; i < hide_node.length; i++) {
            element = hide_node[i]
            if (element.isEdge()) {
                if (element.source().attr("category") == 'lncRNA' || element.target().attr("category") == 'lncRNA') {
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
                if (element.source().attr("category") == 'lncRNA' || element.target().attr("category") == 'lncRNA') {
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
    relogout()
    $("#loadding").show()
})



$(document).keyup(function(event) {

    switch (event.keyCode) {
        case 27:
            rmClass();
        case 96:
            rmClass();
    }
});

$.get("data/data.txt?t=" + Math.random(), function(dataText) {
    var allTextLines = dataText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(/\t/);
    var lines = [];
    var mrna_set = new Set();
    var mirna_set = new Set();
    var lnc_set = new Set();
    var link_set = new Set();
    var flag1 = ""
    var flag2 = ""
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(/\t/);
        if (data.length == headers.length) {
            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
            }
            if (tarr[2] == "miRNA") {
                mirna_set.add(tarr[0])
                flag1 = "miRNA"
            }
            if (tarr[2] == "mRNA") {
                mrna_set.add(tarr[0])
                flag1 = "mRNA"
            }
            if (tarr[2] == "lncRNA") {
                lnc_set.add(tarr[0])
                flag1 = "lncRNA"
            }
            if (tarr[3] == "miRNA") {
                mirna_set.add(tarr[1])
                flag2 = "miRNA"
            }
            if (tarr[3] == "mRNA") {
                mrna_set.add(tarr[1])
                flag2 = "mRNA"
            }
            if (tarr[3] == "lncRNA") {
                lnc_set.add(tarr[1])
                flag1 = "lncRNA"
            }
            link_set.add([tarr[0], tarr[1], flag1, flag2])
        }
    }
    mrna_set.forEach(function(mrna) {
        cy.add({
            data: {
                id: mrna,
                category: "mRNA"
            }
        })
    }, this);

    mirna_set.forEach(function(mirna) {
        cy.add({
            data: {
                id: mirna,
                category: "miRNA"
            }
        })
    }, this);

    lnc_set.forEach(function(lncrna) {
        cy.add({
            data: {
                id: lncrna,
                category: "lncRNA"
            }
        })
    }, this);

    link_set.forEach(function(link) {
        var data0 = link[0]
        var data1 = link[1]
        var flag1 = link[2]
        var flag2 = link[3]
        if (flag1 === "mRNA" && flag2 === "mRNA") {
            cy.add({
                data: {
                    id: data0 + data1,
                    source: data0,
                    target: data1,
                    category: 3
                }
            })
        }
        if ((flag1 === "mRNA" && flag2 === "miRNA") || ((flag1 === "miRNA" && flag2 === "mRNA"))) {
            cy.add({
                data: {
                    id: data0 + data1,
                    source: data0,
                    target: data1,
                    category: 2
                }
            })
        }
        if ((flag1 === "mRNA" && flag2 === "lncRNA") || ((flag1 === "lncRNA" && flag2 === "mRNA"))) {
            cy.add({
                data: {
                    id: data0 + data1,
                    source: data0,
                    target: data1,
                    category: 1
                }
            })
        }
    }, this);
    relogout()
});
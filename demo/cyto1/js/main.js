$("#ipt").draggable();

// Add a method to the graph model that returns an
// object with every neighbors of a node inside:
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
    var k,
        neighbors = {},
        index = this.allNeighborsIndex[nodeId] || {};

    for (k in index)
        neighbors[k] = this.nodesIndex[k];

    return neighbors;
});



s = sigma.parsers.gexf(
    'data/3.gexf', {
        container: 'sigma-container',
        settings: {
            defaultEdgeType: 'arrow',
            defaultNodeBorderColor: "#000",
            // defaultLabelSize: 16,
            borderSize: 1,
            minEdgeSize: 0.25,
            maxEdgeSize: 0.6,
            maxNodeSize: 10,
        }
    },
    function(s) {
        // We first need to save the original colors of our
        // nodes and edges, like this:
        s.graph.nodes().forEach(function(n) {
            n.originalColor = n.color;
        });
        s.graph.edges().forEach(function(e) {
            e.originalColor = e.color;
        });

        // When a node is clicked, we check for each node
        // if it is a neighbor of the clicked one. If not,
        // we set its color as grey, and else, it takes its
        // original color.
        // We do the same for the edges, and we only keep
        // edges that have both extremities colored.
        s.bind('clickNode', function(e) {
            var nodeId = e.data.node.id,
                toKeep = s.graph.neighbors(nodeId);
            toKeep[nodeId] = e.data.node;

            // s.graph.nodes().forEach(function(n) {
            //     if (toKeep[n.id])
            //         n.color = n.originalColor;
            //     else
            //         n.color = 'rgba(255,255,255,0.1)';
            // });

            s.graph.edges().forEach(function(e) {

                if (toKeep[e.source] && toKeep[e.target]) {
                    e.color = e.originalColor;
                    e.hidden = false;
                } else {
                    e.hidden = true;
                }
                // e.color = 'rgba(255,255,255,0)';
            });

            // Since the data has been modified, we need to
            // call the refresh method to make the colors
            // update effective.
            s.refresh();
        });

        // When the stage is clicked, we just color each
        // node and edge with its original color.
        s.bind('rightClick', function(e) {
            rmClass();
        });


        function rmClass() {
            s.graph.nodes().forEach(function(n) {
                n.color = n.originalColor;
            });
            s.graph.edges().forEach(function(e) {
                e.color = e.originalColor;
                e.hidden = 0;
            });
            s.refresh();
        }


        $("#ipt input").bind('keydown', function(e) {
            if (e.which == 13) {
                $("#searchlabel").html("");
                rmClass()
                item_name = $("#ipt input").val().toLowerCase()

                s.graph.nodes().forEach(function(e) {
                    if (e.id.toLowerCase() == item_name) {
                        e.color = 'yellow';
                        s.cameras[0].goTo({ x: e.x, y: e.y, ratio: 1 })
                        s.refresh();
                        $("#searchlabel").html("true");
                    }
                });
            }
        })

    }
);

if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        //my custom functionality on right click
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() {
        //my custom functionality on right click
        window.event.returnValue = false;
    });
};

$("button").click(function() {
    console.log("there");
    item_name = $("#ipt input").val().toLowerCase();
    search(item_name);
})
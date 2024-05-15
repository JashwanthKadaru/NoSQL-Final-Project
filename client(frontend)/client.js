document.addEventListener('DOMContentLoaded', async function () {
  const clusterContainer = document.getElementById('cluster-container')
  const nodeSelect = document.getElementById('node-select')

  const shard_colors = [
    'linear-gradient(to bottom, #FF69B4, #F941A4)',
    'linear-gradient(to bottom, #FFD700, #FF9800)',
    'linear-gradient(to bottom, #CCE599, #9ADBC7)',
    'linear-gradient(to bottom, #007BFF, #00BFFF)',
    'linear-gradient(to bottom, #FF00F5, #8B00FF)',
    'linear-gradient(to bottom, #40E0D0, #00CED1)',
    'linear-gradient(to bottom, #FFA000, #FFCC99)',
    'linear-gradient(to bottom, #E6E6FA, #D8BFD8);',
  ]

  const createCluster = (cluster_data) => {
    const parent = document.createElement('div')
    parent.classList.add('cluster-parent')

    const master_section = document.createElement('div')
    const master_node = document.createElement('div')
    const master_text = document.createElement('div')
    const middle_section = document.createElement('div')
    const vertical = document.createElement('div')

    master_node.classList.add('master-node')
    master_text.classList.add('master-node-text')
    master_text.innerText = 'Master Server'
    master_node.appendChild(master_text)
    master_section.classList.add('master-section')
    master_section.appendChild(master_node)
    parent.appendChild(master_section)

    middle_section.classList.add('middle-section')
    vertical.classList.add('vertical-line')
    middle_section.appendChild(vertical)
    parent.appendChild(middle_section)

    // NODES_SECTION STARTS HERE
    const nodes_section = document.createElement('div')

    const node1 = document.createElement('div')
    node1.classList.add('node')
    const node2 = document.createElement('div')
    node2.classList.add('node')
    const node3 = document.createElement('div')
    node3.classList.add('node')

    const single_node1 = document.createElement('div')
    const vertical_node1 = document.createElement('div')
    const shard_node1 = document.createElement('div')
    const single_node2 = document.createElement('div')
    const vertical_node2 = document.createElement('div')
    const shard_node2 = document.createElement('div')
    const single_node3 = document.createElement('div')
    const vertical_node3 = document.createElement('div')
    const shard_node3 = document.createElement('div')

    nodes_section.classList.add('nodes-section')

    single_node1.classList.add('single-node')
    single_node1.classList.add('snode1')
    single_node1.innerText = 'Node 1'
    shard_node1.classList.add('shard-div')
    single_node1.appendChild(shard_node1)
    vertical_node1.classList.add('node-vertical-line')
    node1.appendChild(vertical_node1)
    node1.appendChild(single_node1)

    single_node2.classList.add('single-node')
    single_node2.classList.add('snode2')
    single_node2.innerText = 'Node 2'
    shard_node2.classList.add('shard-div')
    single_node2.appendChild(shard_node2)
    vertical_node2.classList.add('node-vertical-line')
    node2.appendChild(vertical_node2)
    node2.appendChild(single_node2)

    single_node3.classList.add('single-node')
    single_node3.classList.add('snode3')
    single_node3.innerText = 'Node 3'
    shard_node3.classList.add('shard-div')
    single_node3.appendChild(shard_node3)
    vertical_node3.classList.add('node-vertical-line')
    node3.appendChild(vertical_node3)
    node3.appendChild(single_node3)

    nodes_section.appendChild(node1)
    nodes_section.appendChild(node2)
    nodes_section.appendChild(node3)
    parent.appendChild(nodes_section)

    console.log('Here1')
    console.log(cluster_data)
    let shard_color_cntr = 0
    for (let node of cluster_data) {
      if (node.type === 'Node') {
        for (let shard of node.shards) {
          const shardDiv = document.createElement('div')
          shardDiv.id = 'node_' + node.server_id + '_shard_' + shard
          shardDiv.innerText = 'shard ' + shard
          shardDiv.classList.add('shard')
          shardDiv.style.backgroundImage = shard_colors[shard_color_cntr]
          shard_color_cntr = (shard_color_cntr += 1) % 8
          if (node.server_id === 1) shard_node1.appendChild(shardDiv)
          else if (node.server_id === 2) shard_node2.appendChild(shardDiv)
          else if (node.server_id === 3) shard_node3.appendChild(shardDiv)
        }
      }
    }

    for (let node of cluster_data) {
      if (node.type === 'Node' && !node.health_status) {
        console.log('bad node:', node)
        if (node.server_id === 1) {
          node1.style.opacity = 0.3
        }
        if (node.server_id === 2) {
          node2.style.opacity = 0.3
        }
        if (node.server_id === 3) {
          node3.style.opacity = 0.3
        }
      }
    }
    clusterContainer.appendChild(parent)
  }

  clusterData = undefined
  // Define the URL of your Flask API endpoint
  const apiUrl = 'http://127.0.0.1:5000/get_node_info'
  response = await fetch(apiUrl, {
    mode: 'cors',
  })

  if (!response.ok) {
    throw new Error(`Network response was not ok (status: ${response.status})`)
  }

  clusterData = await response.json() // Parse the JSON response

  // Assuming you have the cluster data in JSON format
  // const clusterData = [
  //   {
  //     type: 'Master',
  //     server_id: 0,
  //     health_status: true,
  //     shards: [1, 3, 5],
  //     recentUpdate: '2024-05-14T00:00:00Z',
  //     syncStatus: [],
  //   }, // No syncStatus for master
  //   {
  //     type: 'Node',
  //     server_id: 1,
  //     health_status: false,
  //     shards: [2, 4],
  //     recentUpdate: '2024-05-13T23:59:59Z',
  //     syncStatus: [{ server_id: 2, shard_id: 2, synced: true }],
  //   },
  //   {
  //     type: 'Node',
  //     server_id: 2,
  //     health_status: true,
  //     shards: [1, 5],
  //     recentUpdate: '2024-05-14T00:01:00Z',
  //     syncStatus: [{ server_id: 3, synced: true }],
  //   },
  //   {
  //     type: 'Node',
  //     server_id: 3,
  //     health_status: true,
  //     shards: [1, 2, 5],
  //     recentUpdate: '2024-05-14T00:01:00Z',
  //     syncStatus: [{ server_id: 1, synced: true }],
  //   },
  // ]

  createCluster(clusterData)

  // Find the button element by its id
  const myButton = document.getElementById('update-cluster-info')

  // Add an event listener to the button
  myButton.addEventListener('click', async function () {
    clusterData = undefined
    // Define the URL of your Flask API endpoint
    const apiUrl = 'http://127.0.0.1:5000/get_node_info'
    response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(
        `Network response was not ok (status: ${response.status})`
      )
    }

    clusterData = await response.json() // Parse the JSON response

    const parentElement = clusterContainer.querySelector('div.cluster-parent')

    // Check if the child element exists
    if (parentElement) {
      // Remove the child element from the parent
      clusterContainer.removeChild(parentElement)
    }
    createCluster(clusterData)
  })

  const queryTypeSelect = document.getElementById('query-type')
  const queryOptionsDiv = document.getElementById('query-options')
  const reloadNodeMapButton = document.getElementById('reload-node-map')
  const reloadShardMapButton = document.getElementById('reload-shard-map')

  queryTypeSelect.addEventListener('change', function () {
    const queryType = queryTypeSelect.value

    // Clear existing query options
    queryOptionsDiv.innerHTML = ''

    if (queryType === 'search') {
      // Add textbox for subject
      queryOptionsDiv.innerHTML = `
                <div class="mb-4">
                    <label for="subject" class="block text-gray-700 font-semibold">Subject:</label>
                    <input id="subject" type="text" class="mt-1 h-8 border-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
            `
    } else if (queryType === 'update') {
      // Add textboxes for subject, predicate, and object
      queryOptionsDiv.innerHTML = `
                <div class="mb-4">
                    <label for="subject" class="block text-gray-700 font-semibold">Subject:</label>
                    <input id="subject" type="text" class="mt-1 h-8 border-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="mb-4">
                    <label for="predicate" class="block text-gray-700 font-semibold">Predicate:</label>
                    <input id="predicate" type="text" class="mt-1 h-8 border-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="mb-4">
                    <label for="object" class="block text-gray-700 font-semibold">Object:</label>
                    <input id="object" type="text" class="mt-1 h-8 border-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
            `
    } else if (queryType === 'merge') {
      // Add dropdown for choosing target server ID
      queryOptionsDiv.innerHTML = `
                <div class="mb-4">
                    <label for="target-server-id" class="block text-gray-700 font-semibold">Target Server ID:</label>
                    <select id="target-server-id" class="mt-1 h-8 border-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <!-- Target server ID options will be populated dynamically -->
                    </select>
                </div>
            `
    }
  })

  reloadNodeMapButton.addEventListener('click', function () {
    fetchNodeMapData()
  })

  reloadShardMapButton.addEventListener('click', function () {
    fetchShardMapData()
  })

  const updateNodesButton = document.getElementById('update-nodes')

  updateNodesButton.addEventListener('click', function () {
    const selectedNode = nodeSelect.value

    // Simulate updating node status
    updateNode(selectedNode)
  })

  // Function to update node status
  function updateNode(selectedNode) {
    // Simulate API call to update node status
    console.log(`Node ${selectedNode} is turned on.`)
  }

  function fetchNodeMapData() {
    // Make a request to fetch node to shard mapping data from the server
    // Replace the URL with your actual endpoint
    fetch('/get-node-map')
      .then((response) => response.json())
      .then((data) => {
        // Clear existing table rows
        const nodeMapTableBody = document.querySelector('#node-map tbody')
        nodeMapTableBody.innerHTML = ''
        // Populate table with fetched data
        data.forEach((entry) => {
          const row = document.createElement('tr')
          row.innerHTML = `
            <td>${entry.node}</td>
            <td>${entry.shard}</td>
          `
          nodeMapTableBody.appendChild(row)
        })
      })
      .catch((error) => console.error('Error fetching node map data:', error))
  }

  function fetchShardMapData() {
    // Make a request to fetch shard to shard range mapping data from the server
    // Replace the URL with your actual endpoint
    fetch('/get-shard-map')
      .then((response) => response.json())
      .then((data) => {
        // Clear existing table rows
        const shardMapTableBody = document.querySelector('#shard-map tbody')
        shardMapTableBody.innerHTML = ''
        // Populate table with fetched data
        data.forEach((entry) => {
          const row = document.createElement('tr')
          row.innerHTML = `
            <td>${entry.shard}</td>
            <td>${entry.range}</td>
          `
          shardMapTableBody.appendChild(row)
        })
      })
      .catch((error) => console.error('Error fetching shard map data:', error))
  }

  // Initial fetch of data when the page loads
  fetchNodeMapData()
  fetchShardMapData()
})

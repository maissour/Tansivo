<template>
    <div ref="gridContainer"></div>
</template>

<script>
import { Grid } from 'gridjs'
import 'gridjs/dist/theme/mermaid.css'

export default {
    name: 'GridTable',
    props: {
        cols: {
            type: Array,
            required: true
        },
        rows: {
            type: Array,
            required: true
        },
        search: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 5
        },
        sort: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            gridInstance: null
        }
    },
    mounted() {
        if (this.rows.length > 0) {
            this.renderGrid()
        }
    },
    watch: {
        rows: {
            handler(newRows) {
                if (newRows.length > 0) {
                    this.renderGrid()
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        renderGrid() {
            if (!this.$refs.gridContainer) return
            if (this.gridInstance) {
                this.gridInstance.destroy();
                this.gridInstance = null;
            }
            // Clear previous content
            this.$refs.gridContainer.innerHTML = ''
            const columns = JSON.parse(JSON.stringify(this.cols))
            const rows = JSON.parse(JSON.stringify(this.rows))
            this.gridInstance = new Grid({
                columns: columns,
                data: rows,
                search: this.search,
                sort: this.sort,
                pagination: {
                    enabled: true,
                    limit: this.limit
                }
            })

            this.gridInstance.render(this.$refs.gridContainer)
        }
    }
}
</script>

<template>
    <div class="row h-100 mt-2">
        <div class="col-12">
            <div class="border border-1 p-1 mb-2 d-flex align-items-center">
                <span role="button" class="mx-1"><i class="fa-solid fa-bold"></i></span>
                <span role="button" class="mx-1"><i class="fa-solid fa-font"></i></span>
                <span role="button" class="mx-1"><i class="fa-solid fa-fill"></i></span>
            </div>
        </div>
        <div class="col-2">
            <div class="border border-1 p-1 h-100">
                <div class="tool-item p-2 mb-3" draggable="true" @dragstart="onDragStart($event, 'text')">
                    {{ $t('general.text') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="companyNameFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'companyName')">
                    {{ $t('invoicePage.companyName') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="companyAddressFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'companyAddress')">
                    {{ $t('invoicePage.companyAddress') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="companyPhoneFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'companyPhone')">
                    {{ $t('invoicePage.companyPhone') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="clientNameFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'clientName')">
                    {{ $t('invoicePage.clientName') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="clientAddressFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'clientAddress')">
                    {{ $t('invoicePage.clientAddress') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="clientPhoneFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'clientPhone')">
                    {{ $t('invoicePage.clientPhone') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="invoiceDateFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'invoiceDate')">
                    {{ $t('invoicePage.invoiceDate') }}
                </div>
                <div class="tool-item p-2 mb-3" v-if="dueDateFieldAvailable" draggable="true"
                    @dragstart="onDragStart($event, 'dueDate')">
                    {{ $t('invoicePage.dueDate') }}
                </div>
                <div class="tool-item p-2" draggable="true" @dragstart="onDragStart($event, 'table')">
                    Table (2x4)
                </div>
            </div>
        </div>
        <div class="col-10 h-100 design-canvas p-0" @dragover.prevent @drop="onDrop">
            <div v-for="(field, index) in fields" :key="index" class="draggable-field"
                :style="{ top: field.y + 'px', left: field.x + 'px', position: 'absolute' }"
                :data-field="field.dataFieldAtt">
                <template v-if="field.dataFieldAtt !== 'table'">
                    <span contenteditable>{{ field.text }}</span>
                </template>
                <template v-else-if="field.dataFieldAtt === 'table'">
                    <table class="design-table">
                        <thead>
                            <tr>
                                <th contenteditable>Cell</th>
                                <th contenteditable>Cell</th>
                                <th contenteditable>Cell</th>
                                <th contenteditable>Cell</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td contenteditable>Cell</td>
                                <td contenteditable>Cell</td>
                                <td contenteditable>Cell</td>
                                <td contenteditable>Cell</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <span data-field="deleteBtn" role="button" class="mx-2" @click="deleteField(index)">
                    <i class="fa-solid fa-trash-can"></i>
                </span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { Fields } from '@/interface/index'
export default defineComponent({
    data() {
        return {
            fields: [] as Fields[],
            dragOffsetText: { x: 0, y: 0 },
            companyNameFieldAvailable: true,
            companyAddressFieldAvailable: true,
            companyPhoneFieldAvailable: true,
            clientNameFieldAvailable: true,
            clientAddressFieldAvailable: true,
            clientPhoneFieldAvailable: true,
            invoiceDateFieldAvailable: true,
            dueDateFieldAvailable: true,
        }
    },
    methods: {
        onDragStart(event: DragEvent, type: string) {
            event.dataTransfer?.setData('fieldType', type)
            var rect = (event.target as HTMLElement).getBoundingClientRect()
            this.dragOffsetText = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            }
        },
        onDrop(event: DragEvent) {
            var fieldType = event.dataTransfer?.getData('fieldType')
            var canvas = (event.currentTarget as HTMLElement).closest('.design-canvas')
            if (!canvas) return
            var rect = canvas.getBoundingClientRect()
            var x = event.clientX - rect.left - this.dragOffsetText.x
            var y = event.clientY - rect.top - this.dragOffsetText.y
            x = x < 0 ? 0 : x
            y = y < 0 ? 0 : y
            switch (fieldType) {
                case 'companyName':
                    if (fieldType === 'companyName' && this.companyNameFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.companyName'),
                            dataFieldAtt: 'companyName'
                        })
                        this.companyNameFieldAvailable = false
                    }
                    break;
                case 'companyAddress':
                    if (fieldType === 'companyAddress' && this.companyAddressFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.companyAddress'),
                            dataFieldAtt: 'companyAddress'
                        })
                        this.companyAddressFieldAvailable = false
                    }
                    break;
                case 'companyPhone':
                    if (fieldType === 'companyPhone' && this.companyPhoneFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.companyPhone'),
                            dataFieldAtt: 'companyPhone'
                        })
                        this.companyPhoneFieldAvailable = false
                    }
                    break;
                case 'clientName':
                    if (fieldType === 'clientName' && this.clientNameFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.clientName'),
                            dataFieldAtt: 'clientName'
                        })
                        this.clientNameFieldAvailable = false
                    }
                    break;
                case 'clientAddress':
                    if (fieldType === 'clientAddress' && this.clientAddressFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.clientAddress'),
                            dataFieldAtt: 'clientAddress'
                        })
                        this.clientAddressFieldAvailable = false
                    }
                    break;
                case 'clientPhone':
                    if (fieldType === 'clientPhone' && this.clientPhoneFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.clientPhone'),
                            dataFieldAtt: 'clientPhone'
                        })
                        this.clientPhoneFieldAvailable = false
                    }
                    break;
                case 'invoiceDate':
                    if (fieldType === 'invoiceDate' && this.invoiceDateFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.invoiceDate'),
                            dataFieldAtt: 'invoiceDate'
                        })
                        this.invoiceDateFieldAvailable = false
                    }
                    break;
                case 'dueDate':
                    if (fieldType === 'dueDate' && this.dueDateFieldAvailable) {
                        this.fields.push({
                            x,
                            y,
                            text: this.$t('invoicePage.dueDate'),
                            dataFieldAtt: 'dueDate'
                        })
                        this.dueDateFieldAvailable = false
                    }
                    break;
                case 'table':
                    if (fieldType === 'table') {
                        this.fields.push({
                            x,
                            y,
                            text: '',
                            dataFieldAtt: 'table'
                        })
                    }
                    break;
                default:
                    this.fields.push({
                        x,
                        y,
                        text: this.$t('general.text'),
                        dataFieldAtt: 'text'
                    })
                    break;
            }
        },
        deleteField(index: number) {
            const removed = this.fields.splice(index, 1)[0]
            switch (removed.dataFieldAtt) {
                case 'companyName':
                    this.companyNameFieldAvailable = true
                    break;
                case 'companyAddress':
                    this.companyAddressFieldAvailable = true
                    break;
                case 'companyPhone':
                    this.companyPhoneFieldAvailable = true
                    break;
                case 'clientName':
                    this.clientNameFieldAvailable = true
                    break;
                case 'clientAddress':
                    this.clientAddressFieldAvailable = true
                    break;
                case 'clientPhone':
                    this.clientPhoneFieldAvailable = true
                    break;
                case 'invoiceDate':
                    this.invoiceDateFieldAvailable = true
                    break;
                case 'dueDate':
                    this.dueDateFieldAvailable = true
                    break;
                default:
                    break
            }
        },
    }
})
</script>

<style scoped>
.tool-item {
    cursor: grab;
    background-color: #e0e0e0;
    user-select: none;
}

.design-canvas {
    border: 2px dashed #ccc;
    position: relative;
    background-color: #f9f9f9;
}

.draggable-field {
    padding: 4px 8px;
    background-color: white;
    border: 1px solid #ddd;
    min-width: 100px;
}
</style>

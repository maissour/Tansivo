<script lang="ts">
import { defineComponent } from 'vue';
import type { ProductContent } from '../interface/index';
import * as bootstrap from 'bootstrap';

export default defineComponent({
    data() {
        return {
            productsContent: [
                {
                    id: 1,
                    selectedProd: false,
                    prodName: '',
                    prodPrice: '',
                    prodQte: ''
                }
            ],
            content: {
                companyName: "",
                companyAddress: "",
                companyPhone: "",
                clientName: "",
                clientAddress: "",
                clientPhone: "",
                products: [] as ProductContent[]
            },
            selectedModel: ""
        }
    },
    methods: {
        addProduct() {
            var lastId = this.productsContent.length > 1 ? this.productsContent[this.productsContent.length - 1].id : 1;

            this.productsContent.push(
                {
                    id: lastId + 1,
                    selectedProd: false,
                    prodName: '',
                    prodPrice: '',
                    prodQte: ''
                })
        },
        removeProduct() {
            this.productsContent.pop()
        },
        saveProductData() {
            this.content.products = this.productsContent
        },
        createModel() {
            console.log("data :", this.content)
        }
    }
})
</script>
<template>
    <h1>{{ $t('menu.invoice') }}</h1>
    <div class="row p-2">
        <div class="col-md-4">
            <select class="form-select" aria-label="Default select example" v-model="selectedModel">
                <option selected>{{ $t('invoicePage.selectModel') }}</option>
                <option value="model-1">One</option>
                <option value="model-2">Two</option>
                <option value="model-3">Three</option>
            </select>
            <div class="mb-2">
                <label for="companyName" class="form-label">
                    {{ $t('invoicePage.companyName') }}
                </label>
                <input type="text" class="form-control" id="companyName" v-model="content.companyName"
                    placeholder="example..">
            </div>
            <div class="mb-2">
                <label for="companyAddress" class="form-label">
                    {{ $t('invoicePage.companyAddress') }}
                </label>
                <input type="text" class="form-control" v-model="content.companyAddress" id="companyAddress"
                    placeholder="example..">
            </div>
            <div class="mb-2">
                <label for="companyPhone" class="form-label">
                    {{ $t('invoicePage.companyPhone') }}
                </label>
                <input type="text" class="form-control" v-model="content.companyPhone" id="companyPhone"
                    placeholder="0000000000">
            </div>
            <div class="mb-2">
                <label for="clientName" class="form-label">
                    {{ $t('invoicePage.clientName') }}
                </label>
                <input type="text" class="form-control" v-model="content.clientName" id="clientName"
                    placeholder="example..">
            </div>
            <div class="mb-2">
                <label for="clientAddress" class="form-label">
                    {{ $t('invoicePage.clientAddress') }}
                </label>
                <input type="text" class="form-control" v-model="content.clientAddress" id="clientAddress"
                    placeholder="example..">
            </div>
            <div class="mb-2">
                <label for="clientPhone" class="form-label">
                    {{ $t('invoicePage.clientPhone') }}
                </label>
                <input type="text" class="form-control" v-model="content.clientPhone" id="clientPhone"
                    placeholder="0000000000">
            </div>

            <input type="button" :value="$t('general.product')" readonly class="form-control" data-bs-toggle="modal"
                data-bs-target="#productModalInvoice">
            <!-- Modal -->
            <div class="modal fade" id="productModalInvoice" tabindex="-1" aria-labelledby="productModalInvoiceLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="productModalInvoiceLabel">
                                {{ $t('invoicePage.products') }}
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="d-flex justify-content-between align-items-center"
                                v-for="prod in productsContent" :key="prod.id">
                                <input type="number" v-model="prod.id" hidden>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="prod.selectedProd"
                                        id="checkDefault">
                                </div>
                                <div class="mb-2">
                                    <input type="text" class="form-control" id="productName"
                                        :placeholder="$t('invoicePage.enterProductName')" v-model="prod.prodName">
                                </div>
                                <div class="mb-2">
                                    <input type="text" class="form-control" id="productPrice"
                                        :placeholder="$t('invoicePage.enterProductPrice')" v-model="prod.prodPrice">
                                </div>
                                <div class="mb-2">
                                    <input type="text" class="form-control" id="productQte"
                                        :placeholder="$t('invoicePage.enterProductQte')" v-model="prod.prodQte">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <span class="cursor-pointer" @click="addProduct">
                                    <i class="fs-4 fa-solid fa-circle-plus"></i></span>
                                <span class="cursor-pointer" @click="removeProduct">
                                    <i class="fs-4 fa-solid fa-circle-minus"></i></span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                {{ $t('general.close') }}
                            </button>
                            <button type="button" class="btn btn-primary" @click="saveProductData"
                                data-bs-dismiss="modal">
                                {{ $t('general.confirm') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-primary w-100" @click="createModel">{{ $t('general.create') }}</button>
        </div>
        <div class="col-md-8 border border-1 rounded-2">
            <div v-if="selectedModel === 'model-1'" id="model-1">model one</div>
            <div v-if="selectedModel === 'model-2'" id="model-2">model two</div>
            <div v-if="selectedModel === 'model-3'" id="model-3">model three</div>
        </div>
    </div>
</template>
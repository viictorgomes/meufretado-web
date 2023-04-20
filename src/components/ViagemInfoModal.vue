<template>
    <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Informações da viagem</p>
            </header>
            <section class="modal-card-body">
                <GmapMap :zoom="4" :center="inicio" style="width: 100%; height: 400px"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: false,
                      streetViewControl: true,
                      rotateControl: false,
                      fullscreenControl: false,
                      disableDefaultUi: false
                    }" ref="gmap">
                    <DirectionsRenderer
                      travelMode="DRIVING"
                      :origin="{lat: -22.7605591, lgn: -43.4037201}"
                      :destination="{lat: -22.7868557, lng: -43.3130887}"
                    />
                  </GmapMap>
            </section>
            <footer class="modal-card-foot">
               
            </footer>
        </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DirectionsRenderer from "@/components/DirectionsRenderer";

@Component({
  components: {
    DirectionsRenderer
  },
  props: ['inicio', 'destino']
})
export default class ViagemInfoModal extends Vue {
    mounted()
    {
        //console.log(DirectionsRenderer)
    }
}
</script>

<style lang="scss" scoped>

</style>
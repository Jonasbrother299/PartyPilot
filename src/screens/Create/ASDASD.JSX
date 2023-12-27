  return (
    <View style={styles.container}>
      <View style={styles.actionContainer}>
        <SafeAreaView>
          <View style={styles.actionWrapper}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={{ marginRight: "auto" }}
            >
              <View style={[styles.action, styles.actionFilled]}>
                <FeatherIcon color="#000" name="chevron-left" size={22} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.action}>
                <FeatherIcon color="#fff" name="heart" size={22} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.action}>
                <FeatherIcon color="#fff" name="share" size={22} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          alt=""
          source={{
            uri: "https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
          }}
          style={styles.heroImg}
        />

        <View style={styles.section}>
          <View style={styles.sectionBody}>
            <Text style={styles.title}>Old Time Burger</Text>

            <Text style={styles.subtitle}>
              Comes with BBQ sause, pickles, tomatoes, and onions. Served medium
              rare.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Side</Text>

              <Text style={styles.sectionSubtitle}>Select one option</Text>
            </View>

            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>Required</Text>
            </View>
          </View>

          <View style={styles.sectionOptions}>
            {[
              { label: "Fries", price: null },
              { label: "Onion Rings", price: 1.95 },
              { label: "Cole Slaw", price: null },
              { label: "Sweet Potato Fries", price: 2.95 },
              { label: "Side Salad", price: null },
            ].map(({ label, price }, index) => {
              const isActive = form.side === label;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setForm({ ...form, side: label });
                  }}
                >
                  <View
                    style={[styles.radio, index === 0 && { borderTopWidth: 0 }]}
                  >
                    <View
                      style={[
                        styles.radioInput,
                        isActive && styles.radioInputActive,
                      ]}
                    />

                    <Text style={styles.radioLabel}>{label}</Text>

                    {price && (
                      <Text style={styles.radioPrice}>
                        +$
                        {price}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Meat Temperature</Text>

              <Text style={styles.sectionSubtitle}>Select one option</Text>
            </View>

            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>Required</Text>
            </View>
          </View>

          <View style={styles.sectionOptions}>
            {["Well Done", "Medium Well", "Medium", "Medium Rare", "Rare"].map(
              (label, index) => {
                const isActive = form.temperature === label;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setForm({ ...form, temperature: label });
                    }}
                  >
                    <View
                      style={[
                        styles.radio,
                        index === 0 && { borderTopWidth: 0 },
                      ]}
                    >
                      <View
                        style={[
                          styles.radioInput,
                          isActive && styles.radioInputActive,
                        ]}
                      />

                      <Text style={styles.radioLabel}>{label}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.overlay}>
        <TouchableOpacity
          onPress={() => {
            // handle onPress
          }}
          style={{ flex: 1, paddingHorizontal: 24 }}
        >
          <View style={styles.btn}>
            <Text style={styles.btnText}>Add to order ($15.95)</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  heroImg: {
    width: "100%",
    height: 180,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#494949",
  },
  section: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e7e7e7",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  sectionBadge: {
    backgroundColor: "#e7e7e7",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBadgeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1d1d1d",
  },
  sectionOptions: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1d1d1d",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6d6d6d",
  },
  actionContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  actionFilled: {
    backgroundColor: "#e8f0f9",
    borderRadius: 9999,
  },
  radio: {
    position: "relative",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTopWidth: 1,
    borderColor: "#e7e7e7",
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2d2d3a",
  },
  radioInput: {
    width: 18,
    height: 18,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "#1d1d1d",
    marginRight: 12,
  },
  radioInputActive: {
    borderWidth: 5,
    borderColor: "#1d1d1d",
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 0.45,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#FF6738",
    borderColor: "#FF6738",
  },
  action: {
    width: 36,
    height: 36,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  actionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: -8,
    paddingHorizontal: 16,
  },
  radioPrice: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6d6d6d",
    marginLeft: "auto",
  },
});
